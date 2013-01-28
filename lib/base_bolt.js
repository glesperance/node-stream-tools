var util        = require('util')
  , Stream      = require('stream').Stream
  ;
  
util.inherits(Bolt, Stream);

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Bolt.prototype.end = function () {
  this.emit('end');
};

Bolt.prototype.destroy = function () {
  this.emit('close');
}

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt() {
  this.writable = true;
  this.readable = true;
  Stream.apply(this);
};

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
