// Czech PILSNER
module.exports = function(packet){
  var ip = packet.payload.shost.addr;
  var packetType = packet.payload.payload.payload.decoderName;
  //var info = packet;


  //builder
  return {
      ip,
      packetType,
      //info
  };
};
