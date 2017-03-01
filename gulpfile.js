var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var creds = require('config/config')();

gulp.task('default', function () {
  nodemon({
    script: 'app.js',
    ext: 'js pug',
    env: {
      PORT: 3000,
      SOCRATA_USER_NAME: "webteam@kingcounty.gov",
      SOCRATA_USER_PASSWORD : "L7SdxOPRKIkx",
      SOCRATA_API_TOKEN : "HUhrupu6tx5TyuUqQ0RYPcdDm"
    },
    ignore: ['./node_modules/**', 'gulpfile.js']
  })
  .on('restart', function () {
    console.log('Restarting...');
  });
});