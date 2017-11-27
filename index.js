'use strict'

const Live = require('level-live')
const EventEmitter = require('events')

module.exports = (db, opts, cb) => {
  let count = 0
  if (!cb) {
    ;[opts, cb] = [{}, opts]
  }

  db
    .createKeyStream(opts)
    .on('data', () => count++)
    .on('error', cb)
    .on('end', () => cb(null, count))
}

module.exports.live = (db, opts) => {
  const keys = new Set()
  const events = new EventEmitter()

  const stream = new Live(db, opts)
  stream.on('data', ({ type, key, value }) => {
    if (type === 'put') {
      keys.add(key)
    } else {
      keys.delete(key)
    }
    events.emit('value', keys.size)
  })
  stream.on('error', err => events.emit('error', err))

  events.get = () => keys.size
  events.destroy = () => stream.destroy()
  return events
}
