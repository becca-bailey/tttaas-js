function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.board = ["", "", "", "", "", "", "", "", ""];
  this.status = "inProgress";
}

Game.prototype.setSpotToMarker = function(spot, marker) {
  this.board[spot] = marker;
}

Game.prototype.resetBoard = function() {
  this.board = ["", "", "", "", "", "", "", "", ""];
  this.status = "inProgress;"
}
