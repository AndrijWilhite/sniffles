var geoip = require('geoip-lite');

module.exports = function(packet) {

  var ip = packet.payload.payload.saddr.addr;
  var packetType = packet.payload.payload.payload.decoderName;
  var ipID = packet.payload.payload.identification;
  var {sport, dport, urgentPointer, windowSize, ackno, seqno} = packet.payload.payload.payload;
  var {syn, fin, nonce, cwr, ece, urg, ack, psh, rst} = packet.payload.payload.payload.flags;
  var info = packet;

  //geo locator
  var ipCon = ip.toString();
  var ipStr = ipCon.replace(/,/g, '.');
  var geo = geoip.lookup(ipStr);

  return {
      ip,
      geo,
      ipID,
      packetType,
      sport,
      dport,
      urgentPointer,
      syn,
      fin,
      nonce,
      cwr,
      ece,
      urg,
      ack,
      psh,
      rst,
      windowSize,
      ackno,
      seqno,
      info
  };
};
