# gulp-extname [![NPM version](https://badge.fury.io/js/gulp-extname.svg)](http://badge.fury.io/js/gulp-extname)

> gulp plugin to dynamically rewrite dest extensions based on src extensions.

### Install with [npm](npmjs.org):

```bash
npm i gulp-extname --save-dev
```

## Run tests

```bash
npm test
```

## Usage

```js
var gulp = require('gulp');
var extname = require('gulp-extname');

gulp.task('default', function() {
  gulp.src('styles.less')
    .pipe(extname())
    .pipe(gulp.dest('dist/css'));
    //=> dist/css/styles.css
});
```

### Define extension

Explicitly pass an extension to use. Any of these will work:

```js
.pipe(extname('.foo'))

// or
.pipe(extname('foo'))

// or
.pipe(extname({ext: 'foo'}))
```

## Extension mappings

The following extensions are mapped automatically:

```js
// html
.md    //=> .html
.hbs   //=> .html
.swig  //=> .html
.tmpl  //=> .html
.html  //=> .html
.htm   //=> .html

// css
.less  //=> .css
.styl  //=> .css
.sass  //=> .css
.scss  //=> .css
.css   //=> .css

// js
.coffee//=> .js
.js    //=> .js
```

[Add extension mappings](https://github.com/jonschlinkert/ext-map), or use [rewrite-ext](https://github.com/jonschlinkert/rewrite-ext) for non-gulp projects.

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/gulp-extname/issues)

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert  
Released under the ,  licenses

***

_This file was generated by [verb](https://github.com/assemble/verb) on December 08, 2014. To update, run `npm i -g verb && verb`._