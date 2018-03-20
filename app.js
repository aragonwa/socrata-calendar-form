const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('Socrata', new OAuth2Strategy({
    authorizationURL: 'https://data.kingcounty.gov/oauth/authorize',
    tokenURL: 'https://data.kingcounty.gov/oauth/access_token',
    userAuthorizationURL: 'https://kcalex.localtunnel.me/oauth/authorize',
    clientID: 'HUhrupu6tx5TyuUqQ0RYPcdDm',
    clientSecret: 'uwpxW9vV-8ULqdf823ATu33UN6sLmDmGAWxu',
    callbackURL: 'https://kcalex.localtunnel.me/auth/socrata/callback'
  },
  function(token, tokenSecret, profile, done) {
    return done(null, profile)
  }
));

const app = express();
app.use(session({ secret: 'very secret'}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});

if(process.env.NODE_ENV !== 'production') {
  app.use(require('morgan')('dev'));
}

const creds = (process.env.NODE_ENV === 'production') ? require('./config/config.prod.js') : require('./config/config.dev.js');

const port = process.env.PORT || 3000;


app.set('view engine', 'pug');
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));


let code = '';
//Login
app.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/allow')
  }
  var html = "<ul>\
    <li><a href='/auth/socrata'>Socrata</a></li>\
    <li><a href='/logout'>logout</a></li>\
  </ul>";

  res.send(html);
});
//Log out
app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

app.get('/allow', function (req, res) {
  var html = "<h1>Secrect area</h1>" + req.session.code;
  res.send(html);
});

app.get('/auth/socrata', passport.authenticate('Socrata'));

// const https = require('request');
app.get('/auth/socrata/callback',
  passport.authenticate('Socrata', { failureRedirect: '/' }),
  function(req, res, next) {
    // Successful authentication, redirect home.
    req.session.code = req.query.code;
    // res.redirect('/allow');
    next();
  });
  app.post('/auth/access_token',
  function(req, res, next) {
    req.session.code = req.query.code;
    res.redirect('/allow');
  });

app.use('/', require('./routes/routes')(creds));



app.listen(port, function () {
  console.log('Running on port: ' + port);
});
