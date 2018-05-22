#!/usr/bin/env node

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 7000,
    publicDir = process.argv[2] || __dirname + '/public',
    path = require('path'),
    buildHTML = require('./buildHTML.js');
    ;

app.get('/', function (req, res) {
  res.send(buildHTML());
});

app.post('/', function (req, res) {
    console.log(req.body); /* or maybe req.params.bocy */
    res.send(req.body);
/*res.send(buildHTML());
 * send back a pdf file OR
 */
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);
