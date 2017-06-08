// Brown Ale
module.exports = function(packet) {
  if(packet.payload.payload.decoderName == 'ipv4'){
    var ip = packet.payload.payload.saddr.addr;
    var ipType = packet.payload.payload.decoderName;
    var noFrag = packet.payload.payload.flags.doNotFragment;
    var moreFrag = packet.payload.payload.flags.moreFragments;
    var packetType = packet.payload.payload.payload.decoderName;
    var dport = packet.payload.payload.payload.dport;
    var info = packet;

    //var info = packet;


    return {
        ip,
        packetType,
        ipType,
        noFrag,
        moreFrag,

        dport,
        info
    };
  } else if(packet.payload.payload.decoderName == 'ipv6') {
    var ip = packet.payload.shost.addr;
    var packetType = packet.payload.payload.payload.decoderName;
    var ipType = packet.payload.payload.decoderName;
    var dport = packet.payload.payload.payload.dport;
    var info = packet;
    var dport = packet.payload.payload.payload.dport;


    return {
      ip,
      dport,
      packetType,
      ipType,
      dport,
      info
    }
  }
};
