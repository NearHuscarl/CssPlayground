// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
// prevent gulp watch task from crashing if something throws error
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function (done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
  done();
});

gulp.task('sass', function (done) {
  gulp
    .src('./sass/main.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
  done();
});

gulp.task('watch', function (done) {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./index.html', function (done) {
    browserSync.reload();
    done();
  });
  done();
});

gulp.task(
  'default',
  gulp.series('sass', 'browserSync', 'watch')
);