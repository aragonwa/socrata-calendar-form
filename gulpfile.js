var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
  nodemon({
    script: 'app.js',
    ext: 'js pug',
    env: {
      PORT: 3000
    },
    ignore: ['./node_modules/**', 'gulpfile.js']
  })
  .on('restart', function () {
    console.log('Restarting...');
  });
});