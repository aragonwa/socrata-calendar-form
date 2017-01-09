var express = require('express');

var routes = function(){
    var router = express.Router();
    router.route('/')
        .get(function(req,res){
            console.log('hello');
            res.render('index')
        })
        .post(function (req, res) {
            console.log(req.body);
            res.redirect('/');
        });
    return router;
};

module.exports = routes;
