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
  if (gameState.gameType === "computerVsComputer") {
    var computerMarker = gameState.getPlayerMarker();
    return "{\"board\": " + JSON.stringify(gameState.board) + ", \"gameType\": \"" + gameState.gameType + "\", \"computerMarker\": \"" + computerMarker + "\"}";
  } else {
    return "{\"board\": " + JSON.stringify(gameState.board) + ", \"gameType\": \"" + gameState.gameType + "\"}";
  }
}
