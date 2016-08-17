function GameFactory(httpClient, ui) {
  this.httpClient = httpClient;
  this.ui = ui;
}

GameFactory.prototype.getGame = function(player1Type, player2Type) {
  if (player1Type === "human" && player2Type === "human") {
    return new PlayerVsPlayerGame(this.httpClient, this.ui);
  } else if (player1Type === "human" && player2Type === "computer") {
    return new PlayerVsComputerGame(this.httpClient, this.ui);
  } else if (player1Type === "computer" && player2Type === "human") {
    return new ComputerVsPlayerGame(this.httpClient, this.ui);
  } else {
    return new ComputerVsComputerGame(this.httpClient, this.ui);
  }
}
