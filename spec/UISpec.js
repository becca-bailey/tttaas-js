describe("UI", function() {
  var board = ["X","","","","","","","",""];

  beforeEach(function() {
    ui = new UI();
    game = new Game();
<<<<<<< HEAD
    var html = setFixtures('<h2 id="turn-label">Your turn!</h2><table id="board"><tr><td id="0" class="spot enabled grid_3"></td><td id="1" class="spot enabled grid_3"></td><td id="2" class="spot enabled grid_3"></td></tr><tr><td id="3" class="spot enabled grid_3"></td><td id="4" class="spot enabled grid_3"></td><td id="5" class="spot enabled grid_3"></td></tr><tr><td id="6" class="spot enabled grid_3"></td><td id="7" class="spot enabled grid_3"></td><td id="8" class="spot enabled grid_3"></td></tr></table><button id="play-again">Play Again</button>');
=======
    var html = setFixtures('<h2 id="turn-label">Your turn!</h2><table id="board"><tr><td id="0" class="spot enabled grid_3"></td><td id="1" class="spot enabled grid_3"></td><td id="2" class="spot enabled grid_3"></td></tr><tr><td id="3" class="spot enabled grid_3"></td><td id="4" class="spot enabled grid_3"></td><td id="5" class="spot enabled grid_3"></td></tr><tr><td id="6" class="spot enabled grid_3"></td><td id="7" class="spot enabled grid_3"></td><td id="8" class="spot enabled grid_3"></td></tr></table>');
>>>>>>> 902639d... Extract GameInteractor
  });

  it("can show a board", function() {
    ui.showBoard(board);
    expect($("#0")).toHaveText("X");
  });

  it("can disable a spot", function() {
    ui.disableSpots(board);
    expect($("#0")).not.toHaveClass("enabled");
  });

  it("does not enable a spot that contains a marker", function() {
    ui.disableSpots(board);
    ui.enableSpots(board);
    expect($("#0")).not.toHaveClass("enabled");
  });

  it("can enable a spot", function() {
    ui.disableSpots(board);
    ui.enableSpots(board);
    expect($("#1")).toHaveClass("enabled");
  });
<<<<<<< HEAD
=======

  it("can set the turn label if X wins", function() {
    ui.displayWinner("X");
    expect($("#turn-label")).toHaveText("X wins!!");
  });

  it("can set the turn label if O wins", function() {
    ui.displayWinner("O");
    expect($("#turn-label")).toHaveText("O wins!!");
  });

  it("can set the turn label if there's a tie", function() {
    ui.displayTie();
    expect($("#turn-label")).toHaveText("It's a tie!!");
  });

>>>>>>> 902639d... Extract GameInteractor
});
