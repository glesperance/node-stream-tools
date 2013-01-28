var util      = require('util')
  , _         = require('underscore')
  ;

var BaseBolt  = require('./base_bolt')
  ;

util.inherits(Bolt, BaseBolt);
/* ========================================================================== *
 *  PRIVATE FUNCTIONS                                                         *
 * ========================================================================== */
Bolt.prototype._streamEnded = function (_index) {
  this._endedStreamCount++;

  if (this._endedStreamCount === this._inputStreams.length)
    this.end();
};

Bolt.prototype._pipeAllStreams = function () {
  var self = this;
  _.each(this._inputStreams, function (stream) {
    stream.pipe(self, { end : false });
    stream.on('end', self._streamEnded);
  })
}

/* ========================================================================== *
 *  PUBLIC FUNCTIONS                                                          *
 * ========================================================================== */
Bolt.prototype.write = function(data) {
  this.emit('data', data);
};

/* ========================================================================== *
 *  CONSTRUCTOR & INITIALIZATION                                              *
 * ========================================================================== */
function Bolt(inputStreams) {
  _.bindAll(this);

  BaseBolt.apply(this);
  this._endedStreamCount = 0;
  this._inputStreams = inputStreams;
  this._pipeAllStreams();
}

/* ========================================================================== */
/* ========================================================================== */
module.exports = Bolt;
