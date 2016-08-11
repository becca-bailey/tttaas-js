function Game() {
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
