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
  $("#play-again").addClass("disabled");
}

UI.prototype.enableResetButton = function() {
  $("#play-again").removeClass("disabled");
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

UI.prototype.showMenu = function() {
  $("#menu").show();
}

UI.prototype.hideMenu = function() {
  $("#menu").hide();
}

UI.prototype.showGame = function() {
  $("#game").show();
  this.setSpotHeightToWidth();
}

UI.prototype.hideGame = function() {
  $("#game").hide();
}

UI.prototype.startGame = function() {
  this.hideMenu();
  this.showGame();
}

UI.prototype.playAgain = function() {
  this.showMenu();
  this.hideGame();
  this.clearBoard();
}

UI.prototype.showSwitch = function(n) {
  if ($("#computer" + n).is(":checked")) {
    $("#switch" + n).show();
  }
}

UI.prototype.showSwitchOnChange = function(n) {
  $("#computer" + n).on("change", function() {
    $("#switch" + n).show();
  });

  $("#human" + n).on("change", function() {
    $("#switch" + n).hide();
  });
}

UI.prototype.setSpotHeightToWidth = function() {
  $(".spot").height($(".spot").width());
}

UI.prototype.listenForStartGameClicked = function(callback) {
  $("#start_game").on("click", function(e) {
    callback(e);
  });
}

UI.prototype.listenForSpotClick = function(callback) {
  $(".spot").on("click", function(e) {
    callback(e);
  });
}

UI.prototype.listenForPlayAgainClick = function(callback) {
  $("#play-again").on("click", function(e) {
    callback(e);
  });
}
