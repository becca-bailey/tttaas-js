class PlayerVsComputerGame extends Game {
  constructor (httpClient, ui) {
    super(httpClient, ui);
    this.gameState = new GameState("humanVsComputer");
  }

  play() {
    this.ui.enableSpots(this.gameState.board);
    this.ui.displayHumanTurn();
  }

  takeTurn(spotId) {
    this.ui.disableSpots(this.gameState.board);
    this.gameState.board[spotId] = this.gameState.getPlayerMarker();
    this.ui.displayComputerTurn();
    this.httpClient.postUpdatedGame(PlayerVsComputerGame.prototype.endTurn, this.ui, this.gameState);
  }

  endTurn(response, ui, gameState) {
    gameState.board = response.board;
    gameState.status = response.status;
    ui.showBoard(gameState.board);
    if (gameState.isOver()) {
      PlayerVsComputerGame.prototype.endGame(gameState.status, ui)
    } else {
      ui.displayHumanTurn();
      ui.enableSpots(gameState.board);
    }
  }
}
