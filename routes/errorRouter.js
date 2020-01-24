const router = require('express').Router();

const routes = config => {
  router.get('/error', (req, res) => {
    res.statusCode = 401;
    res.render('error');
  });
  
  return router;
};

module.exports = routes;