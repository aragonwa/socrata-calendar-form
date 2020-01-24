const router = require('express').Router();
const soda = require('soda-js');
const auth = require('../util/auth');
const processBody = require('../util/processBody');

var routes = (config) => {
  var producer = new soda.Producer('data.kingcounty.gov', config.socrata);
  router.route('/')
    .get(auth, (req, res) => {
      res.render('add', {title: 'Add an event'});
    })
    .post((req, res) => {
      const data = processBody(req.body);

      // Push to Socrata
      producer.operation()
        .withDataset(config.socrata.dataset)
        .add(data)
        .on('success', (row) => {
          res.redirect('/thanks');
        })
        .on('error', function (error) {
          console.error(error);
          res.redirect('/error');
        });

    });
  return router;
};
module.exports = routes;
