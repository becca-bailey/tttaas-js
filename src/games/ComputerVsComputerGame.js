var ComputerVsComputerGame = function(httpClient, ui, gameState) {
  this.httpClient = httpClient;
  this.ui = ui;
  this.gameState = gameState;
}

ComputerVsComputerGame.prototype.play = function() {
  this.ui.disableSpots(this.gameState.board);
  this.ui.displayTurn(this.gameState.getPlayerMarker());
  this.ui.disableResetButton();
  this.httpClient.postUpdatedGame(ComputerVsComputerGame.prototype.endTurn, this.ui, this.gameState);
}

ComputerVsComputerGame.prototype.takeTurn = function(ui, gameState, client) {
  ui.displayTurn(gameState.getPlayerMarker());
  client.postUpdatedGame(ComputerVsComputerGame.prototype.endTurn, ui, gameState);
}

ComputerVsComputerGame.prototype.endTurn = function(response, ui, gameState) {
  gameState.board = response.board;
  gameState.status = response.status;
  ui.showBoard(gameState.board);
  if (gameState.isOver()) {
    ComputerVsComputerGame.prototype.endGame(gameState.status, ui)
  } else {
    ui.displayTurn(gameState.getPlayerMarker());
    gameState.switchTurn();
    ComputerVsComputerGame.prototype.sleep(1000)
    ComputerVsComputerGame.prototype.takeTurn(ui, gameState, new HttpClient());
  }
}

ComputerVsComputerGame.prototype.endGame = function(status, ui) {
  ui.enableResetButton();
  if (status === "tie") {
    ui.displayTie()
  } else if (status === "player1Wins") {
    ui.displayWinner("X");
  } else if (status === "player2Wins") {
    ui.displayWinner("O");
  }
}

ComputerVsComputerGame.prototype.sleep = function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

module.exports = ComputerVsComputerGame;
