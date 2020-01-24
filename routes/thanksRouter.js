const router = require('express').Router();

var routes = () => {
    router.get('/', (req, res) => {
        res.render('thanks', {title: 'Thank you'});
    });
    return router;
};
module.exports = routes;
