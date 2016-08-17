class Game {
  constructor(httpClient, ui) {
    this.httpClient = httpClient;
    this.ui = ui;
  }

  endGame(status, ui) {
    if (status === "tie") {
      ui.displayTie()
    } else if (status === "player1Wins") {
      ui.displayWinner("X");
    } else if (status === "player2Wins") {
      ui.displayWinner("O");
    }
  }
}
