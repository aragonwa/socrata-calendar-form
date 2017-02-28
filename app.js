var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/routes')());

app.listen(port, function () {
  console.log('Running on port: ' + port);
});