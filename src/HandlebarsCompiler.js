var $ = require('jquery');
var Handlebars = require('handlebars');

function HandlebarsCompiler() {

}

HandlebarsCompiler.prototype.load = function(templateName, onCompletion) {
  var source;
  var template;

  $.ajax({
      url: "../" + templateName + ".handlebars",
      cache: true,
      success: function(data) {
          source    = data;
          template  = Handlebars.compile(source);
          $('#' + templateName).html(template);
          onCompletion();
      }
  });
  console.log("loaded " + templateName);
}

module.exports = HandlebarsCompiler;
