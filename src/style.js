$(document).ready(function() {
  $(window).resize(function() {
    $(".spot").height($(".spot").width());
  });

  $(".switch").hide();

  $("#computer1").on("change", function() {
    $("#switch1").show();
  });

  $("#human1").on("change", function() {
    $("#switch1").hide();
  });

  $("#computer2").on("change", function() {
    $("#switch2").show();
  });

  $("#human2").on("change", function() {
    $("#switch2").hide();
  });

});
