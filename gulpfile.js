'use strict';

var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nunjucksRender = require('gulp-nunjucks-render');

function loadData() {
    return {
        couple: JSON.parse(fs.readFileSync('./src/data/couple.json', 'utf8')),
        hotels: JSON.parse(fs.readFileSync('./src/data/hotels.json', 'utf8')),
        gallery: JSON.parse(fs.readFileSync('./src/data/gallery.json', 'utf8')),
        sections: JSON.parse(fs.readFileSync('./src/data/sections.json', 'utf8')),
        cadiz: JSON.parse(fs.readFileSync('./src/data/cadiz.json', 'utf8')),
        theme: JSON.parse(fs.readFileSync('./src/data/theme.json', 'utf8'))
    };
}

// compile scss to css
// WARNING: css/styles.min.css has manual edits (icon selectors, hero-min ext, etc.)
// that are NOT reflected in sass/styles.scss. Running this task will overwrite
// those edits and break parts of the site (RSVP icons, hero image, colors).
// To change accent colors, edit src/data/theme.json instead of running sass.
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./js'));
});

// render nunjucks templates to html
gulp.task('html', function () {
    return gulp.src('./src/*.njk')
        .pipe(nunjucksRender({
            path: ['./src/'],
            data: loadData(),
            ext: '.html'
        }))
        .pipe(gulp.dest('./'));
});

// default task (sass excluded — see warning above)
gulp.task('default', gulp.series('minify-js', 'html'));
