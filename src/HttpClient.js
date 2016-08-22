function HttpClient(environment) {
  if (environment == 'local'){
    this.url = 'localhost:5000/game'
  } else {
    this.url = "http://stormy-savannah-24890.herokuapp.com/game"
  }


}

HttpClient.prototype.postUpdatedGame = function(onCompletion, ui, gameState) {
  var data = this.gameStateAsJSON(gameState);
  $.ajax({
          url: this.url,
          crossOrigin: true,
          type: "POST",
          dataType: "json",
          data: data,
          success: function(response) {
            onCompletion(response, ui, gameState)
          },
          error: function() {
            HttpClient.prototype.postUpdatedGame(onCompletion, ui, gameState);
          }
        });
};

HttpClient.prototype.gameStateAsJSON = function(gameState) {
  var json = {};
  json["board"] = gameState.board;
  json["gameType"] = gameState.gameType;
  if (gameState.gameType === "computerVsComputer") {
    json["computerMarker"] = gameState.getPlayerMarker();
  }
  if (gameState.gameType === "humanVsComputer") {
    if (gameState.player1.type === "computer") {
      json["computerDifficulty"] = gameState.player1.difficulty;
    } else {
      json["computerDifficulty"] = gameState.player2.difficulty;
    }
  }
  if (gameState.currentPlayer().type === "computer") {
    json["computerDifficulty"] = gameState.currentPlayer().difficulty;
  }
  return JSON.stringify(json);
}
