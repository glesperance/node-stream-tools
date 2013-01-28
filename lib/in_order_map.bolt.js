var util        = require('util')
  , _           = require('underscore')
  ;

var user        = require('../user')
  , InOrderBolt = require('./in_order.bolt')
  ;

util.inherits(Bolt, InOrderBolt);

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Bolt.prototype.write = function(doc) {
  var args = Array.prototype.slice.call(this.mapArgs)
    , cont = this.createEmitContinuation()
    ;

  args.unshift(doc);
  args.push(cont);

  this.mapFun.apply(this, args);
};

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt() {
  var args    = Array.prototype.slice.call(arguments)
    ;

  _.bindAll(this);

  this.mapFun  = args.shift();
  this.mapArgs = args;

  InOrderBolt.apply(this);
};

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
