// STOUT
module.exports = function(packet){
  var ip = packet.payload.shost.addr;
  var packetType = packet.payload.payload.payload.decoderName;
  var type = packet.payload.payload.payload.type;
  var info = packet;

  //builder
  return {
      ip,
      packetType,
      type,
      info
  };
};
