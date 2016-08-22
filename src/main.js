var environment = 'production'

function getPlayerInfo(playerNumber) {
  var playerType = $("input[name=player" + playerNumber + "]:checked").attr("class");
  var computerDifficulty;
  if (playerType === "computer") {
    computerDifficulty = $("#computer" + playerNumber + "-level").is(":checked") ? "easy" : "hard";
  }
  var player = {type: playerType, difficulty: computerDifficulty};
  return player;
}

$(document).ready(function() {
  var game;
  var ui = new UI();
  var httpClient = new HttpClient(environment);
  var gameFactory = new GameFactory(httpClient, ui);

  ui.showSwitch(1);
  ui.showSwitch(2);

  ui.showSwitchOnChange(1);
  ui.showSwitchOnChange(2);

  $(window).resize(function() {
    ui.setSpotHeightToWidth();
  });


  $("#start_game").on("click", function(e) {
    e.preventDefault();
    ui.startGame();
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
    if (!$(this).hasClass("disabled")) {
      ui.playAgain();
    }
  });
});
