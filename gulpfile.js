// include gulp
var gulp  = require('gulp');

// plugins
var changed = require('gulp-changed');
var sass    = require('gulp-sass');
var serve   = require('gulp-serve');
var prefix  = require('gulp-autoprefixer');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');

// input directories
var sass_src     = 'assets/styles/src/main.scss';
var sass_dir     = 'assets/styles/src/**/*';
var js_src       = 'assets/scripts/main.js';
var js_dir       = 'assets/scripts/src/**/*';

// output directories
var sass_dist     = 'assets/styles/';
var js_dist       = 'assets/scripts/';

// compile sass
gulp.task('sass:compile', function() {
    gulp.src(sass_src)
        .pipe(sass({style: 'compact', sourcemap: true, errLogToConsole: true, includePaths: ['assets/styles/src']}))
        .pipe(prefix(["last 20 version", "> 1%", "ie 8", "ie 7"], { cascade: true }))
        .pipe(gulp.dest(sass_dist));
});

// concat javascript
gulp.task('js:concat', function() {
  gulp.src(js_dir)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(js_dist))
});

// compress javascript
gulp.task('js:compress', function() {
    gulp.src(js_src)
        .pipe(uglify())
        .pipe(gulp.dest(js_dist))
});

// serve
gulp.task('dev', ['sass:compile', 'js:concat', 'js:compress'], function () {
    gulp.watch(sass_dir, ['sass:compile']);
    gulp.watch(js_dir, ['js:concat']);
    gulp.watch(js_src, ['js:compress']);
});
