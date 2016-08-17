class PlayerVsPlayerGame extends Game {
  constructor (httpClient, ui) {
    super(httpClient, ui);
    this.gameState = new GameState("humanVsHuman");
  }

  play() {
    this.ui.enableSpots(this.gameState.board);
    this.ui.displayTurn(this.gameState.getPlayerMarker());
  }

  takeTurn(spotId) {
    this.ui.disableSpots(this.gameState.board);
    this.gameState.board[spotId] = this.gameState.getPlayerMarker();
    this.httpClient.postUpdatedGame(PlayerVsPlayerGame.prototype.endTurn, this.ui, this.gameState);
  }

  endTurn(response, ui, gameState) {
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
}
