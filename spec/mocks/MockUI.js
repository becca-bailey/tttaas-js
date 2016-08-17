function MockUI() {
  this.spotsEnabled = true;
  this.buttonEnabled = true;
  this.statusText = "";
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
  this.statusText = winner + " wins!!";
}

MockUI.prototype.displayTie = function() {
  this.statusText = "It's a tie!!";
}

MockUI.prototype.displayHumanTurn = function() {
  this.statusText = "Your turn!";
}

MockUI.prototype.displayComputerTurn = function() {
  this.statusText = "Computer is thinking...";
}

MockUI.prototype.disableResetButton = function() {
  this.buttonEnabled = false;
}

MockUI.prototype.enableResetButton = function() {
  this.buttonEnabled = true;
}

MockUI.prototype.displayTurn = function(marker) {
  this.statusText = `${marker}'s Turn!`
}

MockUI.prototype.clearBoard = function() {
  this.shownBoard = ["","","","","","","","",""];
}
