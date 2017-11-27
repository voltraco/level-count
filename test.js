const { test } = require('tap')
const level = require('level-mem')
const count = require('.')

test('count', t => {
  const db = level('count')
  count(db, (err, c) => {
    t.error(err)
    t.equal(c, 0)

    db
      .batch()
      .put('a', 'a')
      .put('b', 'b')
      .write(err => {
        t.error(err)

        count(db, (err, c) => {
          t.error(err)
          t.equal(c, 2)

          count(db, { gt: 'a' }, (err, c) => {
            t.error(err)
            t.equal(c, 1)
            t.end()
          })
        })
      })
  })
})

test('live', t => {
  const db = level('live')
  const counts = count.live(db)

  t.equal(counts.get(), 0)
  counts.once('value', c => {
    t.equal(c, 1)
    t.equal(counts.get(), 1)
    db.put('foo', 'baz', err => {
      t.error(err)
      t.equal(counts.get(), 1)
      t.end()
    })
  })
  db.put('foo', 'bar')
})
