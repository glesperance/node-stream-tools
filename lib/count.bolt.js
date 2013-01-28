var util      = require('util')
  ;

var BaseBolt  = require('./base_bolt')
  ;

util.inherits(Bolt, BaseBolt);

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Bolt.prototype.write = function(data) {
  this.emit('data', data);
  this._count++;
};

Bolt.prototype.end = function () {
  this._finalCountCallback(this._count);
  BaseBolt.prototype.end.apply(this, arguments);
};

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt(finalCountCallback) {
  this._count = 0;
  this._finalCountCallback = finalCountCallback;
  BaseBolt.apply(this);
}

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
