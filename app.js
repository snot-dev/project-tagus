require('./config');
var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  pages = require('./app/a_api/a_pages/pagesRouter'),
  units = require('./app/a_api/a_units/unitsRouter'),
  unitFields = require('./app/a_api/a_unitFields/unitFieldsRouter'),
  users = require('./app/a_api/a_users/usersRouter'),
  UserModel = require('./app/a_api/a_users/userModel'),
  translates = require('./app/a_api/a_translates/translatesRouter'),
  settings = require('./app/a_api/a_settings/settingsRouter'),
  apiInitializer = require('./app/a_api/a_initializer/initializer'),
  routeManager = require('./app/a_api/a_pages/routeManager'),
  admin = require('./app/a_routes/admin'),
  db = require('./app/a_dbConfig/db_config'),
  morgan = require('morgan'),
  flash = require('connect-flash'),
  passport = require('passport'),
  bcrypt = require('bcrypt-nodejs'),
  app = express();

require('./config');
require('./app/a_lib/lib').auth.strategies(passport, UserModel, bcrypt);

var portNumber = process.env.PORT_NUMBER;

app.set('views', [path.join(__dirname, 'SiteName/templates'), path.join(__dirname, 'app/a_build/views'),]);
// override this setting to choose the view engine to be used
app.set('view engine', 'hbs');
db.connect(db.connectionSettings.url);
db.checkIfConnected();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('app/a_build'));
app.use(express.static('SiteName'));

app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/', routeManager);
app.use('/admin', admin);
app.use('/api/pages', pages);
app.use('/api/units', units);
app.use('/api/unitFields', unitFields);
app.use('/api/users', users);
app.use('/api/translates', translates);
app.use('/api/settings', settings);
app.use('/api/initializeapi', apiInitializer);


app.listen(portNumber, function () {
  console.log("listening to " + portNumber);
});

module.exports = app;
