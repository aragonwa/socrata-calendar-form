const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

const creds = (process.env.NODE_ENV === 'PROD') ? require('./config/config.prod.js') : require('./config/config.dev.js');

const port = process.env.PORT || 3000;

app.use(session({
  secret: creds.session.secret,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
}));

app.set('view engine', 'pug');
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/routes')(creds));

app.listen(port, function () {
  console.log('Running on port: ' + port);
});