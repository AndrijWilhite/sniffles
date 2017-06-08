//Coffee Stout
module.exports = function(packet){
  var ip = packet.payload.shost.addr;
  var packetType = packet.payload.payload.decoderName;
  var info = packet;


  //builder
  return {
      ip,
      packetType,
      info
  };
};
