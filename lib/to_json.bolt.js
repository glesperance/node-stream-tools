var util      = require('util')
  ;

var BaseBolt  = require('./base_bolt')
  ;

util.inherits(Bolt, BaseBolt);

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Bolt.prototype.write = function(data) {
  if (!this.dataHead) {
    this.dataHead = true;
    this.emit('data', '[');
  }
  
  else
    this.emit('data', ',');

  this.emit('data', JSON.stringify(data));
};

Bolt.prototype.end = function () {
  if (!this.dataHead) {
    this.dataHead = true;
    this.emit('data', '[');
  }
  
  this.emit('data', ']');
  this.emit('end');
};

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt() {
  this.writable = true;
  this.readable = true;
  BaseBolt.apply(this);
};

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
