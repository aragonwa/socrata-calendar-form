var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config.json')

var soda = require('soda-js');

var sodaOpts = config.socrata;

var producer = new soda.Producer('data.kingcounty.gov', sodaOpts);

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));

// var router = require('./Routes/routes');

app.get('/', function(req,res){
  res.render('index')
});

app.post('/', function (req, res) {
  console.log(req.body);
  var data = {
    mynum : 42,
    mytext: "hello world",
    mymoney: 999.99,
    contact_name: 'Alex testing'
  }

  console.log("Adding Sample")

  producer.operation()
    .withDataset('rnmi-uwsb')
    .upsert(data)
      .on('success', function(row) { console.log(row);  })
      .on('error', function(error) { console.error(error); })
  res.redirect('/');
});

app.listen(port, function(){
    console.log('Running on port: ' + port);
});