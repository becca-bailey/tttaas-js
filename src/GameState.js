function GameState(gameType) {
  this.board = ["", "", "", "", "", "", "", "", ""];
  this.status = "in progress";
  this.isXTurn = true;
  this.gameType = gameType;
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
