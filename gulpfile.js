'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const wait = require('gulp-wait')

function showError(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message: err.message
    })(err);

    this.emit('end');
}


//---------------------------------------------------------------------------------- Sass
gulp.task('sass', function() {
    return gulp.src('./scss/main.scss')
        .pipe(wait(100))
        .pipe(plumber({errorHandler : showError}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
        stream: true
    }))
});

//---------------------------------------------------------------------------------- Watch
gulp.task('watch', function(){
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});

//---------------------------------------------------------------------------------- BrowserSync
gulp.task('browserSync', function(){
   browserSync.init({
       server: {
            baseDir: './'
        },
        notify: false
   })
});

gulp.task('default', function () {
     gulp.start(['sass', 'browserSync', 'watch']);
});