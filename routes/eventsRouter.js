const router = require('express').Router();
const soda = require('soda-js');
const auth = require('../util/auth');
const processBody = require('../util/processBody');

var routes = (config) => {
  const consumer = new soda.Consumer('data.kingcounty.gov');
  const producer = new soda.Producer('data.kingcounty.gov', config.socrata);

  router.route('/')
    .get(auth, (req, res) => {
      let today = new Date();
      today = `${today.getFullYear()}-${today.getDay()}-${today.getDate()}`;

      consumer.query()
        .withDataset(config.socrata.dataset)
        .select(['*', ':id'])
        .where(soda.expr.gte(['start_time'],today))
        .getRows()
        .on('success', function (rows) {
          res.render('grid', { title: "All events", rows: rows });
        })
        .on('error', function (error) { console.error(error); });
    });

  router.route('/:id')
    .get(auth, (req, res) => {
      consumer.query()
        .withDataset(config.socrata.dataset)
        .select(['*', ':id'])
        .where({ ":id": req.params.id })
        .getRows()
        .on('success', function (row) {
           res.render('edit', { title: row[0].event_name, row: row[0] });
        })
        .on('error', function (error) { console.error(error); });
    })
    .post(auth, (req, res) => {
      let data = processBody(req.body);
      data[':id'] = req.params.id,
      // Push to Socrata
      producer.operation()
        .withDataset(config.socrata.dataset)
        .upsert(data)
        .on('success', (row) => {
          res.redirect('/thanks');
        })
        .on('error', function (error) {
          console.error(error);
          res.redirect('/error');
        });
    })
    .delete(auth, (req, res) => {

      const data = { ":id": req.params.id, ":deleted": true };
      producer.operation()
        .withDataset(config.socrata.dataset)
        .upsert(data)
        .on('success', (row) => {
          console.log(row, req.params.id);
          res.send(row);
        })
        .on('error', function (error) {
          console.error(error);
          res.redirect('/error');
        });
    });
  return router;
};
module.exports = routes;
