// low abv belinerweise
module.exports = function(packet){
  var ip = packet.payload.shost.addr;
  var packetType = packet.payload.decoderName;
  var info = packet;


  //builder
  return {
      ip,
      packetType,
      info
  };
};
