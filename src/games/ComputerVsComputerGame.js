class ComputerVsComputerGame extends Game {
  constructor (httpClient, ui) {
    super(httpClient, ui);
    this.gameState = new GameState("computerVsComputer");
  }

  play() {
    this.ui.disableSpots(this.gameState.board);
    this.ui.displayTurn(this.gameState.getPlayerMarker());
    this.httpClient.postUpdatedGame(ComputerVsComputerGame.prototype.endTurn, this.ui, this.gameState);
  }

  takeTurn(ui, gameState, client) {
    ui.displayTurn(gameState.getPlayerMarker());
    client.postUpdatedGame(ComputerVsComputerGame.prototype.endTurn, ui, gameState);
  }

  endTurn(response, ui, gameState) {
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

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
}
