const router = require('express').Router();

var routes = (config) => {
  router.route('/')
    .get((req, res) => {
      req.session = null;
      res.redirect('/login');
    });

  return router;
};
module.exports = routes;
