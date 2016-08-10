$(document).ready(function() {
  var ui = new UI();
  var game = new Game();
  $(".spot").on("click", function() {
    if ($(this).hasClass("enabled")) {
      id = parseInt($(this).attr("id"));
      makeMove(ui, game, id);
    }
  });
});

function makeMove(ui, game, spotId) {
  ui.disableSpots(game.board);
  game.setSpotToMarker(spotId, "X");
  ui.showBoard(game.board);
  data = "{\"board\": " + JSON.stringify(game.board) + ", \"gameType\": \"humanVsComputer\"}"
  httpClient = new HttpClient();
  httpClient.makeRequest(data, endTurn, ui, game);
}

function endTurn(response, ui, game) {
  game.board = response.board;
  game.status = response.status;
  ui.enableSpots(game.board);
  ui.showBoard(game.board);
}
