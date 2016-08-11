function UI() {

}

UI.prototype.showBoard = function(board) {
  board.forEach(function(spot, index) {
    if (spot === "X") {
      $("#" + index).html("<span class='human-move'>X</span");
    } else {
      $("#" + index).html(spot);
    }
  });
}

UI.prototype.disableSpots = function(board) {
  board.forEach(function(spot, index) {
    $("#" + index).removeClass("enabled");
  })
}

UI.prototype.disableResetButton = function() {
  $("#play-again").prop("disabled", true);
}

UI.prototype.enableResetButton = function() {
  $("#play-again").prop("disabled", false);
}

UI.prototype.enableSpots = function(board) {
  board.forEach(function(spot, index) {
    if (spot === "") {
      $("#" + index).addClass("enabled");
    }
  });
}

UI.prototype.enableAllSpots = function(board) {
  board.forEach(function(spot, index) {
    $("#" + index).addClass("enabled");
  });
}

UI.prototype.displayWinner = function(winner) {
  $("#turn-label").html(winner + " wins!!");
}

UI.prototype.displayTie = function() {
  $("#turn-label").html("It's a tie!!");
}

UI.prototype.displayHumanTurn = function() {
  $("#turn-label").html("Your turn!");
}

UI.prototype.displayComputerTurn = function() {
  $("#turn-label").html("Computer is thinking...");
}

UI.prototype.clearBoard = function(board) {
  board.forEach(function(spot, index) {
    $("#" + index).html("");
  });
  this.enableAllSpots(board);
  this.displayHumanTurn();
}
