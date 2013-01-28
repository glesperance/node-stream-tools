var Stream  = require('stream').Stream
  , util    = require('util')
  , _       = require('underscore')
  ;

util.inherits(Bolt, Stream);

/* ========================================================================== *
 *  UTILITIES                                                                 *
 * ========================================================================== */
function EmitContinuation (stream) {
  var self = function (err, data) {
    if (err)
      self.err = err;
    else
      self.data = data;

    self.done = true;

    stream._next();
  };
  return self;
};

/* ========================================================================== *
 *  PRIVATE / UTIL FUNCTIONS                                                  *
 * ========================================================================== */

Bolt.prototype._next = function () {
  var emission = this._emissionQueue[0];

  while (emission && emission.done) {
    if (emission.data)
      this.emit('data', emission.data);
    else if (emission.end)
      this.emit('end');
    else if (emission.err)
      this.emit('error', emission.err);

    this._emissionQueue.shift();
    emission = this._emissionQueue[0];
  }
}

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Bolt.prototype.createEmitContinuation = function () {
  var cont = new EmitContinuation(this);
  this._emissionQueue.push(cont);
  return cont;
}

Bolt.prototype.end = function() {
  if (!this.ended) {
    this.ended = true;
    this._emissionQueue.push({ end : true, done : true });
    this._next();
  }
}

Bolt.prototype.destroy = Bolt.prototype.end;

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt() {

  _.bindAll(this);

  this.writable = true;
  this.readable = true;
  this._emissionQueue = [];

  Stream.apply(this);
};

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
