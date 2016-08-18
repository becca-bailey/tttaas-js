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
