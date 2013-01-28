module.exports = {
    AccumulatorSink : require('./lib/accumulator.sink')
  , AggregateBolt   : require('./lib/aggregate.bolt')
  , CountBolt       : require('./lib/count.bolt')
  , FilterBolt      : require('./lib/filter.bolt')
  , InOrderMapBolt  : require('./lib/in_order.bolt')
  , StaticSpout     : require('./lib/static.spout')
  , ToJSONBolt      : require('./lib/to_json.bolt')
  , UniqBolt        : require('./lib/uniq.bolt')
}