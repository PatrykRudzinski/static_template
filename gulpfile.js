'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');

function showError(err) {

    notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.message
    })(err);
    this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false
        //host: 'IP numer'
        //port: 3000
        //browser: 'google chrome'/'chrome'
    });
});

gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("./**/*.js", browserSync.reload());
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', function () {
    gulp.start(['sass', 'browser-sync', 'watch']);
});

