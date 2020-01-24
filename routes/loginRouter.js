const router = require('express').Router();

var routes = (config) => {
  router.route('/')
    .get((req, res) => {
      res.render('login', {title:"Login"});
    })
    .post((req, res) => {

      const { user, pass } = req.body;

      if (user === config.login.user && pass === config.login.pass) {
        req.session.user = "king_county";
        res.redirect('/events');
      } else {
        res.redirect('error');
      }
    });

  return router;
};
module.exports = routes;
