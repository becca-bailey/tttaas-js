function GameFactory(httpClient, ui) {
  this.httpClient = httpClient;
  this.ui = ui;
}

GameFactory.prototype.getGame = function(player1, player2) {
  if (player1.type === "human" && player2.type === "human") {
    return new PlayerVsPlayerGame(this.httpClient, this.ui, new GameState("humanVsHuman", player1, player2));
  } else if (player1.type === "human" && player2.type === "computer") {
    return new PlayerVsComputerGame(this.httpClient, this.ui, new GameState("humanVsComputer", player1, player2));
  } else if (player1.type === "computer" && player2.type === "human") {
    return new ComputerVsPlayerGame(this.httpClient, this.ui, new GameState("humanVsComputer", player1, player2));
  } else {
    return new ComputerVsComputerGame(this.httpClient, this.ui, new GameState("computerVsComputer", player1, player2));
  }
}
