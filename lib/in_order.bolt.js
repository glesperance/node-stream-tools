var Stream  = require('stream').Stream
  , util    = require('util')
  , _       = require('underscore')
  ;

util.inherits(Bolt, Stream);

/* ========================================================================== *
 *  UTILITIES                                                                 *
 * ========================================================================== */
function EmitContinuation (stream) {

  stream._processing++;

  var self = function (err, data) {
    if (err)
      self.err = err;
    else if (Array.isArray(data))
      self.data = data;
    else
      self.data = [data];

    self.done = true;

    stream._processing--;

    stream._next();
  };
  return self;
};

/* ========================================================================== *
 *  PRIVATE / UTIL FUNCTIONS                                                  *
 * ========================================================================== */

Bolt.prototype._next = function () {
  var emission  = this._emissionQueue[0]
    , self      = this
    ;

  while (emission && emission.done) {
    if (emission.data)
      _.each(emission.data, function (dataItem) {
        if (typeof dataItem !== 'undefined')
          self.emit('data', dataItem);
      })

    else if (emission.end)
      this.emit('end');
    else if (emission.err)
      this.emit('error', emission.err);

    this._emissionQueue.shift();
    emission = this._emissionQueue[0];
  }

  var nextInQueue = this._pendingQueue[0];

  while (nextInQueue && this._processing < this.options.limit) {
    this._processing++;
    process.nextTick(nextInQueue);
    this._pendingQueue.shift();
    nextInQueue = this._pendingQueue[0];
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

Bolt.prototype.queue = function(fun) {
  if (this._processing > this.options.limit) {
    this._processing--;
    this._pendingQueue.push(fun);
  }

  else
    fun();
}

Bolt.prototype.destroy = Bolt.prototype.end;

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt(options) {

  _.bindAll(this);

  this.writable = true;
  this.readable = true;

  this.options = _.defaults(options || {}, {
    limit : Infinity
  });

  this._processing = 0;
  this._pendingQueue = [];
  this._emissionQueue = [];

  Stream.apply(this);
};

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
