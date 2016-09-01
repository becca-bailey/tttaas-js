var $ = require('jquery');
var UI = require('./ui');
var HttpClient = require('./HttpClient');
var GameFactory = require('./GameFactory');

var TicTacToe = function() {

}

TicTacToe.prototype.main = function() {
  var environment = require('../package.json').environment;

  this.ui = new UI();
  this.httpClient = new HttpClient(environment);
  this.gameFactory = new GameFactory(httpClient, ui);

  ui.showSwitch(1);
  ui.showSwitch(2);

  ui.showSwitchOnChange(1);
  ui.showSwitchOnChange(2);

  ui.listenForStartGameClicked(TicTacToe.prototype.startGameClicked)
  ui.listenForSpotClick(TicTacToe.prototype.spotClicked);
  ui.listenForPlayAgainClick(TicTacToe.prototype.playAgainClicked)
}

TicTacToe.prototype.getPlayerInfo = function(playerNumber) {
  var playerType = $("input[name=player" + playerNumber + "]:checked").attr("class");
  var computerDifficulty;
  if (playerType === "computer") {
    computerDifficulty = $("#computer" + playerNumber + "-level").is(":checked") ? "easy" : "hard";
  }
  var player = {type: playerType, difficulty: computerDifficulty};
  return player;
}

TicTacToe.prototype.startGameClicked = function(e) {
  e.preventDefault();
  ui.startGame();
  this.game = gameFactory.getGame(TicTacToe.prototype.getPlayerInfo(1), TicTacToe.prototype.getPlayerInfo(2));
  this.game.play();
}

TicTacToe.prototype.playAgainClicked = function(e) {
  if (!$(e.target).hasClass("disabled")) {
    this.ui.playAgain();
  }
}

TicTacToe.prototype.spotClicked = function(e) {
  if ($(e.target).hasClass("enabled")) {
    var id = parseInt($(e.target).attr("id"));
    game.takeTurn(id);
  }
}


module.exports = TicTacToe;
