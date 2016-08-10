function UI() {

}

UI.prototype.showBoard = function(board) {
  board.forEach(function(spot, index) {
    $("#" + index).html(spot);
  })
}

UI.prototype.disableSpots = function(board) {
  board.forEach(function(spot, index) {
    $("#" + index).removeClass("enabled");
  })
}

UI.prototype.enableSpots = function(board) {
  board.forEach(function(spot, index) {
    if (spot === "") {
      $("#" + index).addClass("enabled");
    }
  })
}

UI.prototype.displayWinner = function(winner) {
  $("#turn-label").html(winner + " wins!!");
}

UI.prototype.displayTie = function() {
  $("#turn-label").html("It's a tie!!");
}
