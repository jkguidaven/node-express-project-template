const gulp = require('gulp');

// We will need to extract our static files to the dist folder so
// the compiled app will be able to locate the files
gulp.task('copy-assets', function() {
  return gulp.src('./src/static/**/*')
    .pipe(gulp.dest('./dist/src/static'))
  ;
});