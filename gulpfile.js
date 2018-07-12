var gulp = require('gulp')
var concat = require('gulp-concat')
var concat = require('gulp-rename')
var uglify = require('gulp-uglify')
var uglify = require('gulp-notify')

gulp.task('js', function () {
    return gulp.src(['public/scripts/*.js'])
        .pipe(concat('full.scripts.js'))
        .pipe(gulp.dest('public/dist/js'))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        //.pipe(gulp.dest('public/dist/js'))
        //.pipe(notify({ message: 'Scripts task complete' }));
})

gulp.task('watch', ['js'], function () {
    gulp.watch('public/scripts/**/*.js', ['js'])
})
