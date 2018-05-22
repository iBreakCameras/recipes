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
    bodyParser = require('body-parser'),
    buildHTML = require('./buildHTML.js');
    ;
/*
app.get('/', function (req, res) {
  res.send(buildHTML());
});
*/
//app.use(bodyParser); // <-- this didn't work
app.use(bodyParser.json());

app.post('/', function (req, res) {
    var HTML = buildHTML(req.body); //req.body);
    res.contentType('text/html');
    res.send(HTML);
    //res.send(Object.keys(req.body));
    //res.contentType("application/pdf");
    //res.send(req.body);
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
