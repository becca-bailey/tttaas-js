class ComputerVsPlayerGame extends Game {
  constructor (httpClient, ui) {
    super(httpClient, ui);
    this.gameState = new GameState("humanVsComputer");
  }

  play() {
    this.computerTurn();
    this.httpClient.postUpdatedGame(ComputerVsPlayerGame.prototype.endTurn, this.ui, this.gameState);
    this.ui.enableSpots(this.gameState.board);
    this.ui.displayHumanTurn();
  }

  computerTurn() {
    this.ui.disableSpots(this.gameState.board);
    this.ui.displayComputerTurn();
  }

  takeTurn(spotId) {
    this.gameState.board[spotId] = this.gameState.getPlayerMarker();
    this.computerTurn();
    this.httpClient.postUpdatedGame(ComputerVsPlayerGame.prototype.endTurn, this.ui, this.gameState);
  }

  endTurn(response, ui, gameState) {
    gameState.board = response.board;
    gameState.status = response.status;
    ui.showBoard(gameState.board);
    if (gameState.isOver()) {
      ComputerVsPlayerGame.prototype.endGame(gameState.status, ui)
    } else {
      ui.displayHumanTurn();
      ui.enableSpots(gameState.board);
    }
  }
}
