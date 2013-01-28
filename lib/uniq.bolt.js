var util      = require('util')
  ;

var BaseBolt  = require('./base_bolt')
  ;

util.inherits(Bolt, BaseBolt);

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Bolt.prototype.write = function(data) {
  var itemKey = typeof data === 'object' ? data[this.uniqKey] : data
    ;

  if (!this._memo[itemKey]) {
    this._memo[itemKey] = true;
    this.emit('data', data);
  }
};

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt(uniqKey) {
  this.uniqKey = uniqKey;
  this._memo = {};

  BaseBolt.apply(this);
}

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
