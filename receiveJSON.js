module.exports = function () {
    var fs = require('fs');
    var recipeJSON = fs.readFileSync('./object.json');
    return recipeJSON
}
