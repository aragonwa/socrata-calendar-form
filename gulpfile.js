var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
const creds = require('./config/config.prod.js');

gulp.task('default', function () {
  nodemon({
    script: 'app.js',
    ext: 'js pug',
    env: {
      PORT: 3000,
      SOCRATA_USER_NAME: creds.socrata.username,
      SOCRATA_USER_PASSWORD : creds.socrata.password,
      SOCRATA_API_TOKEN : creds.socrata.apiToken
    },
    ignore: ['./node_modules/**', 'gulpfile.js']
  })
  .on('restart', function () {
    console.log('Restarting...');
  });
});