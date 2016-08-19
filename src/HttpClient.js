function HttpClient() {

}

HttpClient.prototype.postUpdatedGame = function(onCompletion, ui, gameState) {
  console.log(gameState);
  var data = this.gameStateAsJSON(gameState);
  console.log(data);
  $.ajax({
          url: "http://stormy-savannah-24890.herokuapp.com/game",
          // url: "http://localhost:5000/game",
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
  console.log(json);
  return JSON.stringify(json);
}
