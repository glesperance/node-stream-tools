var Stream  = require('stream').Stream
  , util    = require('util')
  , _       = require('underscore')
  ;
  
util.inherits(Sink, Stream);

/* ========================================================================== *
 *  PRIVATE FUNCTIONS                                                         *
 * ========================================================================== */
Sink.prototype._onError = function (err) {
  this.callback(err);
  this.stream.destroy();
};

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Sink.prototype.write = function(dataPacket) {
  this._dataPackets.push(dataPacket);
};

// Closes the underlying file descriptor. Stream is no longer writable nor 
// readable. The stream will not emit any more 'data', or 'end' events. Any 
// queued write data will not be sent. The stream should emit 'close' event once 
// its resources have been disposed of.
Sink.prototype.destroy = function() {
  this.callback(null, this._dataPackets);
  this.writeable = false;
  this.emit('close');
};

Sink.prototype.end = function () {
  this.destroy();
};

/* ========================================================================== *
 *  Static Functions                                                          *
 * ========================================================================== */
Sink.createAndPipe = function (stream, callback) {
  stream.pipe(new Sink(callback));
};

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Sink(callback) {

  _.bindAll(this);

  this._dataPackets = [];

  this.writable = true;
  this.callback = callback;

  this.on('err', this._onError);

  Stream.apply(this);
}
/* ========================================================================== */
/* ========================================================================== */
module.exports = Sink;
