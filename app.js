const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('Socrata', new OAuth2Strategy({
    authorizationURL: 'https://data.kingcounty.gov/oauth/authorize',
    tokenURL: 'https://data.kingcounty.gov/oauth/access_token',
    userAuthorizationURL: 'https://kc-calendar.heroku.com/oauth/authorize',
    clientID: 'HUhrupu6tx5TyuUqQ0RYPcdDm',
    clientSecret: 'uwpxW9vV-8ULqdf823ATu33UN6sLmDmGAWxu',
    callbackURL: 'https://kc-calendar.heroku.com/auth/socrata/callback'
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
  }
));
// const Grant = require('grant-express');
// https://scotch.io/tutorials/implement-oauth-into-your-express-koa-or-hapi-applications-using-grant
// const grant = new Grant({
//   "server": {
//     "protocol": "https",
//     "host": "alex.kingcounty.gov:3000"
//   },
//   "socrata": {
//     "authorize_url": "https://soda.demo.socrata.com/oauth/authorize",
//     "access_url": "https://soda.demo.socrata.com/oauth/access_token",
//     "oauth": 2,
//     "key": "HUhrupu6tx5TyuUqQ0RYPcdDm",
//     "secret": "uwpxW9vV-8ULqdf823ATu33UN6sLmDmGAWxu",
//     "callback": "/handle_socrata_callback",
//   }
// });



const app = express();
app.use(session({ secret: 'very secret'}));
// app.use(grant);
// https://www.npmjs.com/package/express-sslify
// app.get('/login', function (req, res) {

//   // https://soda.demo.socrata.com/oauth/authorize?client_id=HUhrupu6tx5TyuUqQ0RYPcdDm&response_type=code &redirect_uri=http:localhost:3000/handle_socrata_callback
// })

app.get('/auth/provider', passport.authenticate('Socrata'));

app.get('/auth/example/callback',
  // passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // res.redirect('/');
    res.send('Hello World!')
  });
// app.get('/handle_socrata_callback', function (req, res) {
//   console.log(req)
//   res.end(JSON.stringify(req, null, 2))
// })

// const oauth2 = require('simple-oauth2').create({
//   client: {
//     id: '',
//     secret: ''
//   },
//   auth: {
//     tokenHost: 'https://soda.demo.socrata.com/'
//   }
// }); 


// res.redirect(authorizationUri);
// const session = require('express-session');

if(process.env.NODE_ENV !== 'production') {
  app.use(require('morgan')('dev'));
}

const creds = (process.env.NODE_ENV === 'production') ? require('./config/config.prod.js') : require('./config/config.dev.js');

const port = process.env.PORT || 3000;

// app.oauth = oauthserver({
//   model: {},
//   grants: ['password'],
//   debug: true
// });

// app.all('/oauth/token', app.oauth.grant());
//https://soda.demo.socrata.com/oauth/authorize?client_id=YOUR_AUTH_TOKEN&response_type=code &redirect_uri=YOUR_REDIRECT_URI

// app.use(session({
//   secret: creds.session.secret,
//   resave: false, // don't save session if unmodified
//   saveUninitialized: false, // don't create session until something stored
// }));

// app.get('/', app.oauth.authorise(), function (req, res) {
//   res.send('Secret area');
// });

// app.use(app.oauth.errorHandler());

app.set('view engine', 'pug');
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/routes')(creds));

app.listen(port, function () {
  console.log('Running on port: ' + port);
});
