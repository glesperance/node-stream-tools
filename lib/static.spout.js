var util        = require('util')
  , Stream      = require('stream').Stream
  ;
  
util.inherits(Spout, Stream);

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Spout.prototype.destroy = function () {
  this.emit('close');
}

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Spout(dataPackets) {
  var self = this;
  
  if (!Array.isArray(dataPackets))
    dataPackets = [dataPackets];

  this.dataPackets = dataPackets;

  this.writable = true;
  Stream.apply(this);

  process.nextTick(function () {
    for (var i = 0, ii = self.dataPackets.length; i < ii; i++)
      self.emit('data', self.dataPackets[i]);
    
    self.emit('end');
  });
};

/* ========================================================================== */
/* ========================================================================== */
module.exports = Spout;
