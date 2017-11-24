require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./tagus/config/db_config');
const morgan = require('morgan');
const hbs = require('hbs');
const app = express();
const tagusApi = require('./tagus/api');

const portNumber =   process.env.PORT_NUMBER;

// override this settings to choose the view engine to be used
const partialsDir = '/SiteName/views/partials';
app.set('views', [ path.join(__dirname, 'SiteName/views'), path.join(__dirname, partialsDir), path.join(__dirname, 'tagus/tagus_build/views')]);
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname + partialsDir));
hbs.registerHelper('partial', name => {
  return name;
});

db.connect(db.connectionSettings.url);
db.checkIfConnected();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('SiteName'));
app.use(tagusApi.auth.passport.initialize());


app.use('/api', tagusApi.routes.api());
app.use('/', tagusApi.routes.site());

app.use()

app.listen(portNumber, function () {  
  console.log("listening to " + portNumber);
});

module.exports = app;
