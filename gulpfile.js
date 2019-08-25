var gulp = require('gulp');
var sass = require('gulp-sass');
var importCss = require('gulp-import-css');

//style paths
var sassFiles = 'build/assets/sass/*.sass',
    cssDest = 'build/assets/css/';

gulp.task('styles', function () {
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('autoprefixer', function () {
    var postcss = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('build/assets/css/base.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/assets/css/'));
});

gulp.task('importCSS', function () {
    gulp.src('build/assets/css/base.css')
        .pipe(importCss())
        .pipe(gulp.dest('build/assets/css/'));
});

var zip = require('gulp-zip');

gulp.task('zipper', () =>
    gulp.src('build/**')
    .pipe(zip('wunderkammer.zip'))
    .pipe(gulp.dest('dist'))
);

gulp.task('watch', function () {
    gulp.watch(sassFiles, ['styles']);
    gulp.watch('build/assets/css/base.css', ['importCSS']);
    gulp.watch('build/assets/css/base.css', ['autoprefixer']);
});

let cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
    return gulp.src('build/assets/css/base.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('build/assets/css/'));
});
