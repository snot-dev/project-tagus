require('./config');

var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  routes = require('./tagus/api/routes'),
  db = require('./tagus/config/db_config'),
  morgan = require('morgan'),
  passport = require('passport'),
  app = express();

var portNumber = process.env.PORT_NUMBER;

app.set('views', [path.join(__dirname, 'SiteName/templates'), path.join(__dirname, 'tagus/tagus_build/views')]);
// override this setting to choose the view engine to be used
app.set('view engine', 'hbs');
db.connect(db.connectionSettings.url);
db.checkIfConnected();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('SiteName'));

app.use(passport.initialize());
app.use('/api', routes());


app.listen(portNumber, function () {
  console.log("listening to " + portNumber);
});

module.exports = app;
