function PlayerVsPlayerGame(httpClient, ui, gameState) {
  this.httpClient = httpClient;
  this.ui = ui;
  this.gameState = gameState;
}

PlayerVsPlayerGame.prototype.play = function() {
  this.ui.enableSpots(this.gameState.board);
  this.ui.displayTurn(this.gameState.getPlayerMarker());
}

PlayerVsPlayerGame.prototype.takeTurn = function(spotId) {
  this.ui.disableSpots(this.gameState.board);
  this.gameState.board[spotId] = this.gameState.getPlayerMarker();
  this.ui.showBoard(this.gameState.board);
  this.httpClient.postUpdatedGame(PlayerVsPlayerGame.prototype.endTurn, this.ui, this.gameState);
};

PlayerVsPlayerGame.prototype.endGame = function(status, ui) {
  if (status === "tie") {
    ui.displayTie()
  } else if (status === "player1Wins") {
    ui.displayWinner("X");
  } else if (status === "player2Wins") {
    ui.displayWinner("O");
  }
};

PlayerVsPlayerGame.prototype.endTurn = function(response, ui, gameState) {
  gameState.board = response.board;
  gameState.status = response.status;
  ui.showBoard(gameState.board);
  if (gameState.isOver()) {
    PlayerVsPlayerGame.prototype.endGame(gameState.status, ui)
  } else {
    gameState.switchTurn();
    ui.displayTurn(gameState.getPlayerMarker());
    ui.enableSpots(gameState.board);
  }
}
