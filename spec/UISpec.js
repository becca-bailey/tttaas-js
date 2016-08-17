describe("UI", function() {
  var board = ["X","","","","","","","",""];

  beforeEach(function() {
    ui = new UI();
    game = new GameState();
    jasmine.getFixtures().fixturesPath = '../spec/fixtures'
    jasmine.getFixtures().load('indexFixture.html');
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

  it("can display the computer's turn", function() {
    ui.displayComputerTurn();
    expect($("#turn-label")).toHaveText("Computer is thinking...");
  });

  it("can display a human's turn", function() {
    ui.displayHumanTurn();
    expect($("#turn-label")).toHaveText("Your turn!");
  })

  it("can disable the play again button", function() {
    ui.disableResetButton();
    expect($("#play-again")).toHaveProp("disabled");
  });

  it("can enable the play again button", function() {
    ui.enableResetButton();
    expect($("#play-again")).toHaveProp("disabled", false);
  });
});
