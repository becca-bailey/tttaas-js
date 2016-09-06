var ComputerVsPlayerGame = function(httpClient, ui, gameState) {
  this.httpClient = httpClient;
  this.ui = ui;
  this.gameState = gameState;
  this.gameState.isXTurn = true;
}

ComputerVsPlayerGame.prototype.play = function() {
  this.computerTurn();
  this.ui.enableSpots(this.gameState.board);
  this.ui.displayHumanTurn();
}

ComputerVsPlayerGame.prototype.computerTurn = function() {
  this.ui.disableSpots(this.gameState.board);
  this.ui.displayComputerTurn();
  this.httpClient.postUpdatedGame(ComputerVsPlayerGame.prototype.endTurn, this.ui, this.gameState);
}

ComputerVsPlayerGame.prototype.takeTurn = function(spotId) {
  this.gameState.switchTurn();
  this.gameState.board[spotId] = this.gameState.getPlayerMarker();
  this.ui.showBoard(this.gameState.board);
  this.computerTurn();
}

ComputerVsPlayerGame.prototype.endTurn = function(response, ui, gameState) {
  gameState.board = response.board;
  gameState.status = response.status;
  ui.showBoard(gameState.board);
  if (gameState.isOver()) {
    ComputerVsPlayerGame.prototype.endGame(gameState.status, ui);
  } else {
    gameState.switchTurn();
    ui.displayHumanTurn();
    ui.enableSpots(gameState.board);
  }
}
ComputerVsPlayerGame.prototype.endGame = function(status, ui) {
  if (status === "tie") {
    ui.displayTie();
  } else if (status === "player1Wins") {
    ui.displayWinner("X");
  } else if (status === "player2Wins") {
    ui.displayWinner("O");
  }
}

module.exports = ComputerVsPlayerGame;
