require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./tagus/config/db_config');
const morgan = require('morgan');
const app = express();
const tagusApi = require('./tagus/api');

const portNumber =   process.env.PORT_NUMBER;

app.set('views', [path.join(__dirname, 'SiteName/templates'), path.join(__dirname, 'tagus/tagus_build/views')]);
// override this setting to choose the view engine to be used
app.set('view engine', 'hbs');
db.connect(db.connectionSettings.url);
db.checkIfConnected();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('SiteName'));
app.use(tagusApi.auth.passport.initialize());

app.use('/api', tagusApi.routes.api('jwt'));

app.listen(portNumber, function () {  
  console.log("listening to " + portNumber);
});

module.exports = app;
