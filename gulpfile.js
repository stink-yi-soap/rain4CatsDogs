'use strict';

// SASS Packages
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// JS packages
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// Web packages
const browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: "index.html"
       },
    })
})

gulp.task('sassworkflow', function () {
    gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css',
            './src/sass/**/*.scss'
    ])
    // tasks go here
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// add linting
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
            './node_modules/p5/lib/p5.js',
            './src/js/*.js'
        ])
        .pipe(webpackStream(webpackConfig), webpack)
        //.pipe(terser())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
             stream: true
         }))
});

gulp.task('default',['browserSync', 'sassworkflow', 'scripts'], function() {
    gulp.watch('./src/js/*.js', ['scripts']);
    gulp.watch('./src/sass/**/*.scss', ['sassworkflow']);
})