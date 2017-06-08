//jockey box
const fs = require('fs');
const pcap = require('pcap'),
    pcap_session = pcap.createSession('en0', '');
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const deviceIP = require('os').networkInterfaces().en0.map(function(interface) {
    return interface.address;
})[1];
console.log('sniffles have begun, get a tissue');
console.log(deviceIP);
//Packet Converter
const url = 'mongodb://localhost:27017/sniffles';
MongoClient.connect(url, function(err, db) {
    pcap_session.on('packet', function(raw_packet) {
        var packet = pcap.decode.packet(raw_packet);
        var checker = '';


        try {
            if (packet.payload) {
//console.time('test');
                if (packet.payload.payload) {

                    if (packet.payload.payload.payload &&  packet.payload.payload.payload.decoderName) {

                        checker = packet.payload.payload.payload.decoderName;
                    }
                    else {
                        checker = packet.payload.payload.decoderName;

                    }
                }
                else {
                    checker = packet.payload.decoderName;
                }
            }
        } catch (err) {
            console.log('unknown');
            db.collection('unknown').insert(packet);
        }

        // hashtable
        const readers = {
            //transport Layer
            'tcp': require('./packetReaders/transportLayer/tcpReader'),
            'udp': require('./packetReaders/transportLayer/udpReader'),
            'igmp': require('./packetReaders/transportLayer/igmpReader'),
            'icmp': require('./packetReaders/transportLayer/icmpReader'),
            //network layer
            'arp': require('./packetReaders/networkLayer/arpReader'),
            'rarp': require('./packetReaders/networkLayer/rarpReader'),
            //application Layer
            'ftp': require('./packetReaders/applicationLayer/ftpReader'),
            'tftp': require('./packetReaders/applicationLayer/tftpReader'),
            'nfs': require('./packetReaders/applicationLayer/nfsReader'),
            'snmp': require('./packetReaders/applicationLayer/snmpReader'),
            'smtp': require('./packetReaders/applicationLayer/smtpReader'),
            'http': require('./packetReaders/applicationLayer/httpReader'),
            'bootp': require('./packetReaders/applicationLayer/bootpReader'),
            'dhcp': require('./packetReaders/applicationLayer/dhcpReader'),
            'bgp': require('./packetReaders/applicationLayer/bgpReader'),
            'egp': require('./packetReaders/applicationLayer/egpReader'),
            'igp': require('./packetReaders/applicationLayer/igpReader'),
            'rip': require('./packetReaders/applicationLayer/ripReader'),
            'ospf': require('./packetReaders/applicationLayer/ospfReader'),
            'pop3': require('./packetReaders/applicationLayer/pop3Reader'),
            'imap4': require('./packetReaders/applicationLayer/imap4Reader'),
            'telnet': require('./packetReaders/applicationLayer/telnetReader'),
            //bandwidth control
            'bacp': require('./packetReaders/bandwidthControl/bacpReader'),
            'bap': require('./packetReaders/bandwidthControl/bapReader'),
            //link layer
            'cslip': require('./packetReaders/linkLayer/cslipReader'),
            'ethernet': require('./packetReaders/linkLayer/ethernetReader'),
            'ppp': require('./packetReaders/linkLayer/pppReader'),
            'slip': require('./packetReaders/linkLayer/slipReader'),
            //unsorted
            'ethernet-packet': require('./packetReaders/etherReader'),
            'ipv6': require('./packetReaders/ipv6Reader')
        }


        const reader = readers[checker];
        try{
        //console.log(reader);
        if (reader) {
            packet = reader(packet);

            const ipv4Check = `${packet.ip[0]}.${packet.ip[1]}.${packet.ip[2]}.${packet.ip[3]}`;
            const ipv6Check =`${packet.ip[0]}.${packet.ip[1]}.${packet.ip[2]}.${packet.ip[3]}.${packet.ip[4]}.${packet.ip[5]}`;
            if(deviceIP === ipv4Check || deviceIP === ipv6Check) {
              //do nothing if it is the scanning device's ip add
            }else{

              db.collection('packets').insert(packet);

            };
            //mongo pusher
            //

        } else {
            db.collection('error').insert({
                'missed': 'another',
                'info': packet
            });
        }
      }catch(err){
        db.collection('error').insert({
            'missed': 'another',
            'info': packet
        });
      }
    });
});
