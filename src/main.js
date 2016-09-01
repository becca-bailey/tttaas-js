var $ = require('../lib/jquery-git.min');
var UI = require('./ui');
var HttpClient = require('./HttpClient');
var GameFactory = require('./GameFactory');

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

  ui.listenForStartGameClicked(startGameClicked)
  ui.listenForSpotClick(spotClicked);
  ui.listenForPlayAgainClick(playAgainClicked)


  function startGameClicked(e) {
    e.preventDefault();
    ui.startGame();
    game = gameFactory.getGame(getPlayerInfo(1), getPlayerInfo(2));
    game.play();
  }

  function playAgainClicked(e) {
    if (!$(e.target).hasClass("disabled")) {
      ui.playAgain();
    }
  }

  function spotClicked(e) {
    if ($(e.target).hasClass("enabled")) {
      id = parseInt($(e.target).attr("id"));
      game.takeTurn(id);
    }
  }

  $(window).resize(function() {
    ui.setSpotHeightToWidth();
  });
});
