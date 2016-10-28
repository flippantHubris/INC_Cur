var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var browser  = require('browser-sync');
var gulp     = require('gulp');
var panini   = require('panini');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var sherpa   = require('style-sherpa');

var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;


// Port to use for the development server.
var PORT = 8000;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
  sass: [
    'src/assets/scss/*.scss',
    'src/assets/scss/**/*.scss'
  ],
  javascript: [
    'src/assets/js/**/*.js',
    'src/assets/js/*.js'
  ]

};

gulp.task('clean', function(done) {
  rimraf('dist', done);
});


gulp.task('build', function(done) {
  sequence('clean',[ 'scripts', 'img', 'styles' ], 'pages', done);
});


gulp.task('fonts', function() {

  return gulp.src([
    'src/assets/fonts/**/*'
  ])
    .pipe(gulp.dest('dist/fonts/'));
});



gulp.task('img', function() {

  return gulp.src([
    'src/assets/img/**/*.jpg'
  ])
    .pipe(gulp.dest('dist/img/'));
});



gulp.task('styles', function() {

  return gulp.src([
    'src/styles/*.scss'
  ])
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('dist/styles'));
});



// Copy page templates into finished HTML files
gulp.task('pages', function() {
  var injectFiles = gulp.src('dist/**/*.{css,js}');


  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

    gulp.src('src/*.html')
      .pipe(panini({
        root: 'src/',
        layouts: 'src/assets/layouts/',
        partials: 'src/assets/partials/',
      }))
      .pipe(inject(injectFiles, injectOptions))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('scripts', function() {
      gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('dist/scripts/'));
    });



gulp.task('pages:reset', function(cb) {
  panini.refresh();
  gulp.run('pages');
  cb();
});



// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  browser.init({
    server: 'dist', port: PORT
  });
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(['src/*.html'], ['pages:reset', browser.reload]);
  gulp.watch(['src/assets/{layouts,partials}/**/*.html'], ['pages:reset', browser.reload]);
  gulp.watch(['src/styles/**/*.scss'], [ 'styles', browser.reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', browser.reload]);
  gulp.watch(['src/assets/img/**/*'], ['img', browser.reload]);
});
