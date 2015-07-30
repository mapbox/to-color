## `toColor`

[![build status](https://secure.travis-ci.org/mapbox/to-color.svg)](http://travis-ci.org/mapbox/to-color)

### install

    npm install to-color

## API

`toColor`

Given an arbitrary string, create a rgba color
of a specified opacity to identify it visually.

### Parameters

* `str` **`string`** any arbitrary string
* `opacity` **`number`** an opacity value from 0 to 1


### Examples

```js
toColor('tom') //= 'rgba(187,153,68,0.75)'
```

Returns `string` output color
