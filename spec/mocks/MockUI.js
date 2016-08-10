function MockUI() {
  this.spotsEnabled = true;
  this.winnerText = "";
  this.shownBoard = ["","","","","","","","",""];
}

MockUI.prototype.showBoard = function(board) {
  this.shownBoard = board;
}

MockUI.prototype.disableSpots = function(board) {
  this.spotsEnabled = false;
}

MockUI.prototype.enableSpots = function(board) {
  this.spotsEnabled = true;
}

MockUI.prototype.displayWinner = function(winner) {
  this.winnerText = winner + " wins!!";
}

MockUI.prototype.displayTie = function() {
  this.winnerText = "It's a tie!!";
}
