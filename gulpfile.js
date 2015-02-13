var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
//var reactify = require('reactify');
//var to5ify = require('6to5ify');
var browserSync = require('browser-sync');

gulp.task('default', ['markup', 'json', 'watch']);

gulp.task('markup', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('json', function() {
  return gulp.src('*.json')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browserify', function() {
  var b = browserify({
    entries: ['./src/main.js'],
    //extensions: ['.jsx']
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', ['browserify', 'browserSync'], function() {
  gulp.watch('src/**/**.html', ['markup']);
  gulp.watch('src/**/**.{js,jsx}', ['browserify']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './dist'
    },
    port: 8080,
    notify: true
  });
});

