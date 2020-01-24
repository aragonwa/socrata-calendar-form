module.exports = (req, res, next) => {
    if (req.session.user){
      return next();
    }
    else { 
      res.statusCode = 401;
      res.redirect('/login');
      return res;
    }
  };