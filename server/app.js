//NAME: app.js
//AUTH: Ryan McCartney <ryan.mccartney@bbc.co.uk>
//DATE: 05/04/2021
//DESC: OBS Ninjas app defined here - frontend and backend combined

const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const bodyParser = require("body-parser");
const path = require('path');
const helmet = require('helmet');

const logger = require('@server/utils/logger');
const httpLogger = require('@server/utils/httpLogger');

const https = process.env.HTTPS || false;
let host = process.env.HOST || 'localhost';

if(https === true ){
  host = 'https://' + host
  logger.info('OBS Ninja is using HTTPS');
}
else{
  host = 'http://' + host;
  logger.info('OBS Ninja is using HTTP');
}

// Define the Express apilication
let app = express();

app.set('json spaces', 2);
app.use(favicon(path.join(__dirname,'..','client','public','media','favicon.ico')));
app.use(httpLogger)
app.use(cors({origin: host}));

app.use(helmet.contentSecurityPolicy({
  reportOnly:true,
  directives:{
    'default-src': [ "'self'" ],
    'base-uri': [ "'self'" ],
    'block-all-mixed-content': [],
    'font-src': [ "'self'", 'https:', 'http:', 'data:' ],
    'frame-ancestors': [ "'self'" ],
    'img-src': [ "'self'", 'data:' ],
    'object-src': [ "'none'" ],
    'script-src': [ "'self'" ],
    'script-src-attr': [ "'none'" ],
    'style-src': [ "'self'", 'https:', 'http:', "'unsafe-inline'" ],
    'upgrade-insecure-requests': []
  }
}));

// //Configure body parser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..', 'client', 'public')));

app.use('/',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'index.html'));
});

app.use('/convert',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'convert.html'));
});

app.use('/devices',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'devices.html'));
});

app.use('/dual',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'dual.html'));
});

app.use('/popout',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'popout.html'));
});

app.use('/speedtest',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'speedtest.html'));
});

app.use('/supports',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'supports.html'));
});

app.use('/dock',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'dock.html'));
});

app.use('/timer',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'timer.html'));
});

app.use('/zoom',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'zoom.html'));
});

app.use('/electron',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'electron.html'));
});

app.use('/iframe',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'iframe.html'));
});

app.use('/supports',function (req, res) {
    res.sendFile(path.join(__dirname, '..','client', 'html', 'supports.html'));
});

module.exports = app;