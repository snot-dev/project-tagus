require('./config');
var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  pages = require('./tagus/tagus_api/tagus_pages/pagesRouter'),
  units = require('./tagus/tagus_api/tagus_units/unitsRouter'),
  unitFields = require('./tagus/tagus_api/tagus_unitFields/unitFieldsRouter'),
  users = require('./tagus/tagus_api/tagus_users/usersRouter'),
  UserModel = require('./tagus/tagus_api/tagus_users/userModel'),
  translates = require('./tagus/tagus_api/tagus_translates/translatesRouter'),
  settings = require('./tagus/tagus_api/tagus_settings/settingsRouter'),
  apiInitializer = require('./tagus/tagus_api/tagus_initializer/initializer'),
  admin = require('./tagus/tagus_routes/admin'),
  db = require('./tagus/tagus_dbConfig/db_config'),
  morgan = require('morgan'),
  flash = require('connect-flash'),
  passport = require('passport'),
  bcrypt = require('bcrypt-nodejs'),
  app = express();

require('./config');
require('./tagus/tagus_lib/lib').auth.strategies(passport, UserModel, bcrypt);

var portNumber = process.env.PORT_NUMBER;

app.set('views', [path.join(__dirname, 'SiteName/templates'), path.join(__dirname, 'tagus/tagus_build/views')]);
// override this setting to choose the view engine to be used
app.set('view engine', 'hbs');
db.connect(db.connectionSettings.url);
db.checkIfConnected();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('tagus/tagus_build'));
app.use(express.static('SiteName'));

app.use(passport.initialize());
app.use(passport.session());


//routes
var initializerUrl = '/api/initializer';

app.use('/admin', admin);
app.use('/api/pages', pages);
app.use('/api/units', units);
app.use('/api/unitFields', unitFields);
app.use('/api/users', users);
app.use('/api/translates', translates);
app.use('/api/settings', settings);
app.use(initializerUrl, apiInitializer);
app.use('/', require('./tagus/tagus_api/tagus_pages/routeManager')(initializerUrl));


app.listen(portNumber, function () {
  console.log("listening to " + portNumber);
});

module.exports = app;
