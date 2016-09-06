var $ = require('jquery');

function HttpClient(environment) {
  if (environment === 'local'){
    this.url = 'http://localhost:5000/'
  } else {
    this.url = "http://stormy-savannah-24890.herokuapp.com/"
  }
}

HttpClient.prototype.postUpdatedGame = function(onCompletion, ui, gameState) {
  var data = this.gameStateAsJSON(gameState);
  $.ajax({
          url: this.url + "api/computer_move",
          crossOrigin: true,
          type: "POST",
          dataType: "json",
          data: data,
          success: function(response) {
            onCompletion(response, ui, gameState)
          }
        });
};

HttpClient.prototype.getGameStatus = function(onCompletion, ui, gameState) {
  var parameters = this.boardParameters(gameState);
  $.ajax({
          url: this.url + "api/status" + parameters,
          crossOrigin: true,
          dataType: "json",
          success: function(response) {
            onCompletion(response, ui, gameState)
          }
        });
}

HttpClient.prototype.gameStateAsJSON = function(gameState) {
  var json = gameState.getFields();
  return JSON.stringify(json);
}

HttpClient.prototype.boardParameters = function(gameState) {
  return "?board=" + JSON.stringify(gameState.board)
}

module.exports = HttpClient;
