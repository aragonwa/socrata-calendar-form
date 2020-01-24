const router = require('./errorRouter');
const thanksRouter = require('./thanksRouter');
const loginRouter = require('./loginRouter');
const logoutRouter = require('./logoutRouter');
const addRouter = require('./addRouter');
const eventsRouter = require('./eventsRouter');
const errorRouter = require('./errorRouter');

module.exports = (app, creds) => {
    app.use('/', router(creds));
    app.use('/thanks', thanksRouter(creds));
    app.use('/login', loginRouter(creds));
    app.use('/logout', logoutRouter(creds));
    app.use('/add', addRouter(creds));
    app.use('/events', eventsRouter(creds));
    app.use('/error', errorRouter(creds));
    app.get('*', function (req, res) {
      res.redirect('login');
    });
}