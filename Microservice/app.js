const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 2000;

const index = require('./routes/index');
const doctors = require('./routes/doctors');
const patients = require('./routes/patients');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/doctor', doctors);
app.use('/patient', patients)

app.get('/*', function (req, res, next) {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
module.exports = app;