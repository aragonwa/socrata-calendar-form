var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

var config = {
  "socrata": {
    "username" : process.env.SOCRATA_USER_NAME,
    "password" : process.env.SOCRATA_USER_PASSWORD,
    "apiToken" : process.env.SOCRATA_API_TOKEN
  }
}

app.set('view engine', 'pug');
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/routes')(config));

app.listen(port, function () {
  console.log('Running on port: ' + port);
});