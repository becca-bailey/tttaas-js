var $ = require('jquery');

function GameState(gameType, player1, player2) {
  this.board = ["", "", "", "", "", "", "", "", ""];
  this.status = "in progress";
  this.isXTurn = true;
  this.gameType = gameType;
  this.player1 = player1;
  this.player2 = player2;
}

GameState.prototype.updateBoard = function(board) {
  this.board = board;
}

GameState.prototype.updateStatus = function(status) {
  this.status = status;
}

GameState.prototype.switchTurn = function() {
  this.isXTurn = !this.isXTurn;
}

GameState.prototype.getPlayerMarker = function() {
  return this.isXTurn ? "X" : "O"
}

GameState.prototype.isOver = function() {
  return(this.status != "in progress")
}

GameState.prototype.currentPlayer = function() {
  if (this.isXTurn) {
    return this.player1;
  } else {
    return this.player2;
  }
}

GameState.prototype.getComputerDifficulty = function() {
  return this.currentPlayer().difficulty;
}

GameState.prototype.getAdditionalFields = function() {
  switch (this.gameType) {
    case "humanVsHuman":
      return {};
      break;
    case "humanVsComputer":
      return {"computerDifficulty": this.getComputerDifficulty()};
      break;
    case "computerVsComputer":
      return {"computerMarker": this.getPlayerMarker(), "computerDifficulty": this.getComputerDifficulty()};
      break;
  }
}

GameState.prototype.getFields = function() {
  var fields = {};
  fields["board"] = this.board;
  fields["gameType"] = this.gameType;
  var additionalFields = this.getAdditionalFields();
  $.each(additionalFields, function(key, value) {
    fields[key] = value;
  });
  return fields
}

module.exports = GameState;
