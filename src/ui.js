function UI() {
}

UI.prototype.showBoard = function(board) {
  board.forEach(function(spot, index) {
    if (spot === "X") {
      $("#" + index).html("<h1 class='x-move valign center-align'>" + spot + "</h1>");
    } else {
      $("#" + index).html("<h1 class='o-move valign center-align'>" + spot + "</h1>");
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

UI.prototype.displayTurn = function(marker) {
  $("#turn-label").html(marker + "'s turn!");
}

UI.prototype.displayComputerTurn = function() {
  $("#turn-label").html("Computer is thinking...");
}

UI.prototype.clearBoard = function() {
  for (i = 0; i < 9; i++) {
    $("#" + i).html("");
  }
}
