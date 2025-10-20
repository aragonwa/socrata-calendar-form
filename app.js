const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const mountRoutes = require('./routes');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('morgan')('dev'));
}
const creds = (process.env.NODE_ENV === 'Production') ? require('./config/config.prod.js') : require('./config/config.dev.js');
const port = process.env.PORT || 3000;

app.use(session({
  // name: 'session',
  // keys: [creds.session.secret],
  secret: creds.session.secret,
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored,
}));

app.set('view engine', 'pug');
app.use(express.static('bower_components'));
app.use(express.static('img'));
app.use(bodyParser.urlencoded({ extended: false }));

mountRoutes(app, creds);

app.listen(port, function () {
  console.log('Running on port: ' + port);
});
