#!/usr/bin/env node

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 7000,
    publicDir = process.argv[2] || __dirname + '/public',
    path = require('path');

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

function buildHTML() {
  var HTML = '';
  // create variables for template files in an array
  var files =  [ './files/00.stylesheet.css'
               , './files/10.header.html'
               , './files/20.introduction.html'
               , './files/30.recipe.html'
               , './files/90.footer.html'
               ]
  // create map of template fields to firebase fields
  // for later replacing
  var fieldsMap = {
               '{{recipeName}}':''
              ,'{{generalInstructions}}':''
              ,'{{pressureInstructions}}':''
              ,'{{servingSize}}':''
              ,'{{}}':''
             };
  var fs = require('fs');
  // load the style sheet
  var styleSheetCode = fs.readFileSync(files[0]);
  // load the header file
  HTML += fs.readFileSync(files[1]);
  // insert files[0] the stylesheet into files[1] the head tag
  HTML = HTML.replace('{{stylesheet}}',styleSheetCode);
  // concat the boilerplate aka introduction aka files[2]
  HTML += fs.readFileSync(files[2]);
  var recipeTemplate = fs.readFileSync(files[3]);
  var recipe = ''; // recipe is the temporary customized recipe
  // figure out how many recipes there are from firebase
  // for now will just assume 6
  var recipeCount = 6; 
  for (var i = 0;i < recipeCount;i++) {
    recipe = recipeTemplate.toString()
    if (i == 0 || i == 1) {
      recipe = recipe.replace(/{{divClass}}/,' class=recipe' + (i+1)) 
      } else {recipe = recipe.replace(/{{divClass}}/,' class=recipe') };
    HTML += recipe; 
  }
  // concat the footer aka files[4] closing tags container / body and html 
  HTML += fs.readFileSync(files[4]);
  //testing out replacement
  HTML = HTML.replace('{{serves}}','hi there');
  // more to come
  return HTML;
};

/*
// this will grab the firebase data and get sent to the buildHTML func
function getFirebaseData ('recipeSetId') {
  //write code to get firebase data and return object
  let recipetSetData = [
                       1,2,3
                       ]
  return recipeSetData;
};
*/
