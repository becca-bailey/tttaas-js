var $ = require('jquery');
var Handlebars = require('handlebars');

function HandlebarsCompiler() {

}

HandlebarsCompiler.prototype.load = function(templateName, onCompletion) {
  var source;
  var template;

  $.ajax({
      url: "../partials/" + templateName + ".html",
      cache: true,
      success: function(data) {
          source    = data;
          template  = Handlebars.compile(source);
          $('#' + templateName + "-container").html(template);
          onCompletion();
      }
  });
}

module.exports = HandlebarsCompiler;
