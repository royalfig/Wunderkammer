'use strict';
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');


// CSS task
function css() {
    return gulp
        .src("assets/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(clean())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("assets/css/"))
}

const build = gulp.series(css);

gulp.task('watch', function () {
    return gulp.watch('assets/scss/*.scss', gulp.series('css'));
});

exports.css = css;