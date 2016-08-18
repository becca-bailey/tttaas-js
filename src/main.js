var game;
var ui;

function getPlayerInfo(playerNumber) {
  var playerType = $("input[name=player" + playerNumber + "]:checked").attr("class");
  var computerDifficulty = $("#computer" + playerNumber + "-level").is(":checked") ? "easy" : "hard";
  var info = {type: playerType, difficulty: computerDifficulty};
  return info;
}

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
    game = gameFactory.getGame(getPlayerInfo(1), getPlayerInfo(2));
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
