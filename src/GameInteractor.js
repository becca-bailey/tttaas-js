function GameInteractor(ui, game, client) {
  this.ui = ui;
  this.game = game;
  this.httpClient = client;
}

GameInteractor.prototype.makeMove = function(spotId) {
  this.displayMove(spotId)
  var data = this.getGameAsJSON();
  this.httpClient.makeRequest(data, GameInteractor.prototype.endTurn, this.ui, this.game);
}

GameInteractor.prototype.displayMove = function(spotId) {
  this.ui.disableSpots(this.game.board);
  this.game.setSpotToMarker(spotId, "X");
  this.ui.showBoard(this.game.board);
}

GameInteractor.prototype.endTurn = function(response, game, ui) {
  this.game = game
  this.ui = ui
  this.game.board = response.board;
  this.game.status = response.status;
  this.ui.enableSpots(this.game.board);
  this.ui.showBoard(this.game.board);
  if (this.game.status != "in progress") {
    GameInteractor.prototype.endGame(game, ui);
  }
}

GameInteractor.prototype.endGame = function(game, ui) {
  this.ui = ui;
  this.game = game;
  this.ui.disableSpots(this.game.board);
  if (this.game.status == "tie") {
    this.ui.displayTie();
  } else {
    this.ui.displayWinner(GameInteractor.prototype.getWinner(this.game.status));
  }
}

GameInteractor.prototype.getWinner = function(status) {
  if (status === "player1Wins") {
    return "X"
  } else if (status === "player2Wins") {
    return "O"
  }
}

GameInteractor.prototype.getGameAsJSON = function() {
  return "{\"board\": " + JSON.stringify(this.game.board) + ", \"gameType\": \"humanVsComputer\"}"
}
