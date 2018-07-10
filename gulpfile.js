'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const wait = require('gulp-wait');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const uncss = require('gulp-uncss');


//---------------------------------------------------------------------------------- HTML
gulp.task('html_build', function () {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            sortAttributes: true,
            sortClassName: true
        }))
        .pipe(gulp.dest('./build/'))
});

//---------------------------------------------------------------------------------- Sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(wait(100))
        .pipe(plumber({errorHandler : showError}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css_build', function() {
    gulp.src('./src/css/main.css')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({browsers: ['last 3 versions']}))
        .pipe(uncss({
            ignore: [/js/],
            html: ['./src/**/*.html']
        }))
        .pipe(gulp.dest('./build/css/'))
});


//---------------------------------------------------------------------------------- Js
gulp.task('js', function () {
    return gulp.src(['./src/js/**/*.js', '!./src/js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js_build', function () {
    return gulp.src(['./src/js/**/*.js', '!./src/js/main.js'])
        .pipe(babel({presets: ['env']}))
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('./build/js'))
});


//---------------------------------------------------------------------------------- Watch
gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', browserSync.reload);
    gulp.watch(['./src/js/**/*.js', '!./src/js/main.js'], ['js']);
});


//---------------------------------------------------------------------------------- BrowserSync
gulp.task('browserSync', function(){
   browserSync.init({
       server: {
           baseDir: './src/',
            routes: {"/contact": "contact"}
        },
       notify: false
   })
});


//---------------------------------------------------------------------------------- Notify
function showError(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message: err.message
    })(err);

    this.emit('end');
}


//---------------------------------------------------------------------------------- Commands
gulp.task('default', function () {
    gulp.start(['sass', 'browserSync', 'js', 'watch']);
});

gulp.task('build', function () {
    gulp.start(['html_build', 'js_build', 'css_build']);
});