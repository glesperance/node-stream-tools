var util        = require('util')
  , _           = require('underscore')
  ;

var InOrderBolt = require('./in_order.bolt')
  ;

util.inherits(Bolt, InOrderBolt);

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Bolt.prototype.write = function(doc) {
  var args = Array.prototype.slice.call(this.mapArgs)
    , cont = this.createEmitContinuation()
    , self = this
    ;

  args.unshift(doc);
  args.push(cont);

  this.queue(function () { self.mapFun.apply(self, args); })
};

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt() {
  var args    = Array.prototype.slice.call(arguments)
    , options = typeof args[0] === 'object' ? args.shift() : {}
    ;

  _.bindAll(this);

  this.mapFun  = args.shift();
  this.mapArgs = args;

  InOrderBolt.call(this, options);
};

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
