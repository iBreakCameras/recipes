module.exports = function (jsonText) {
  var fs = require('fs');
//  if (!jsonText) { jsonText = fs.readFileSync('./object.json');}
  var recipesJSON = jsonText;  //JSON.parse(jsonText);
  var recipesArray = recipesJSON['newRecipes'];
  var HTML = ''; 
  // create variables for template files in an array
  var files =  [ './files/00.stylesheet.css'
               , './files/10.header.html'
               , './files/20.introduction.html'
               , './files/30.recipe.html'
               , './files/90.footer.html'
               ]   
  var fs = require('fs');
  // load the style sheet
  var styleSheetCode = fs.readFileSync(files[0]);
  // load the header file
  HTML += fs.readFileSync(files[1]);
  // insert files[0] the stylesheet into files[1] the head tag
  HTML = HTML.replace('{{stylesheet}}',styleSheetCode);
  // concat the boilerplate aka introduction aka files[2]
  HTML += fs.readFileSync(files[2]);
  // load the recipe card file
  var recipeTemplate = fs.readFileSync(files[3]);
  var recipe = ''; // recipe is the temporary customized recipe
  var recipeCount = recipesArray.length;  
  for (var i = 0;i < recipeCount;i++) {
    recipe = recipeTemplate.toString()
// Replace the classes for each recipe div -- this is a temporary hack      
    if (i == 0 || i == 1) {
      recipe = recipe.replace(/{{divClass}}/,' class=recipe' + (i+1)) 
      } else {recipe = recipe.replace(/{{divClass}}/,' class=recipe') };
// Replace the main bodies of text
    recipe = recipe.replace(/{{cookInst}}/,recipesArray[i].cookInst);
    recipe = recipe.replace(/{{servings}}/,recipesArray[i].servings);
    recipe = recipe.replace(/{{pressCookInst}}/,recipesArray[i].pressCookInst);       
    recipe = recipe.replace(/{{grocList}}/,recipesArray[i].grocList);
    recipe = recipe.replace(/{{serveSuggestions}}/,recipesArray[i].serveSuggestions);
    recipe = recipe.replace(/{{addiSeas}}/,recipesArray[i].addiSeas);
    recipe = recipe.replace(/{{nutritionNotes}}/,recipesArray[i].nutritionNotes);
// Replace the text in the nutrition circles
    recipe = recipe.replace(/{{name}}/,recipesArray[i].name);
    recipe = recipe.replace(/{{calories}}/,recipesArray[i].calories);
    recipe = recipe.replace(/{{tfat}}/,recipesArray[i].tfat);
    recipe = recipe.replace(/{{carbs}}/,recipesArray[i].carbs);
    recipe = recipe.replace(/{{fiber}}/,recipesArray[i].fiber);
    recipe = recipe.replace(/{{protein}}/,recipesArray[i].protein);
    recipe = recipe.replace(/{{sugar}}/,recipesArray[i].sugar);
    recipe = recipe.replace(/{{satFat}}/,recipesArray[i].satFat);
// Replace the true / false values for heart, calCons and diabetes
    if (recipesArray[i].heart) {
    recipe = recipe.replace(/<!-- {{heart}} -->/,'<div class=heart></div>');
    } 
    if (recipesArray[i].calCons) {
    recipe = recipe.replace(/<!-- {{calCons}} -->/,'<div class=calCons></div>');
    }
    if (recipesArray[i].diabetes) {
    recipe = recipe.replace(/<!-- {{diabetes}} -->/,'<div class=diabetes></div>');
    }     
           
//  recipe = recipe.replace(/{{propertyName}}/,recipesArray[i].propertyName);
    HTML += recipe;  
  }
  // concat the footer aka files[4] closing tags container / body and html 
  HTML += fs.readFileSync(files[4]);
  return HTML;
};

