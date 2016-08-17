var game;
var ui;

$(document).ready(function() {
  $("#game").hide();
  $(window).resize(function() {
    $(".spot").height($(".spot").width());
  });
  $("#start_game").on("click", function(e) {
    e.preventDefault();
    $("#menu").hide();
    $("#game").show();
    $(".spot").height($(".spot").width());
    ui = new UI();
    var httpClient = new HttpClient();
    var gameFactory = new GameFactory(httpClient, ui);
    var player1Type = $("input[name=player1]:checked").attr("class")
    var player2Type = $("input[name=player2]:checked").attr("class")
    game = gameFactory.getGame(player1Type, player2Type);
    game.play();
  });

  $(".spot").on("click", function() {
    if ($(this).hasClass("enabled")) {
      id = parseInt($(this).attr("id"));
      game.takeTurn(id);
    }
  });

  $("#play-again").on("click", function() {
    $("#menu").show();
    $("#game").hide();
    ui.clearBoard();
  });
});
