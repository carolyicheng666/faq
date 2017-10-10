var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var clean = require('gulp-clean');
var compass = require('gulp-compass');
var watch = require('gulp-watch');
var uglify = require("gulp-uglify");

gulp.task('compass', () =>
    gulp.src('./dist/sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: './dist/css',
      sass: './dist/sass'
    }))
);

gulp.task('min-css', ['compass'], () =>
    gulp.src('./dist/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/css'))
);

gulp.task('min-js', ['min-css'], () =>
    gulp.src('./dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
);

gulp.task('html', () =>
    gulp.src('./dist/index.html')
    .pipe(gulp.dest('./build'))
);

gulp.task('default', ['compass', 'min-css', 'min-js', 'html']);

gulp.task('watch', () =>
    gulp.watch('./dist/**/*', ['default'])
);

gulp.task('clean', () =>
    gulp.src('./build/*', {read: false})
    .pipe(clean())
);