# level-count

Count the KV pairs in a [leveldb](https://github.com/level/level) range, with optional live mode.

## Usage

Count once:

```js
count(db, { gt: 'prefix' }, (err, c) => {
  // ...
})
```

Count continuously:

```js
count.live(db, { gt: 'prefix' })
count.on('value', c => {
  // ...
})
const c = count.get()
```

## Installation

```bash
$ npm install level-count
```

## API

### count(db[, opts], cb)

### counts = count(db[, opts])
### counts.get()
### counts.on('count', fn)
### counts.destroy()

## License

MIT