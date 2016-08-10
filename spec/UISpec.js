describe("UI", function() {
  var board = ["X","","","","","","","",""];

  beforeEach(function() {
    ui = new UI();
    game = new Game();
    var html = setFixtures('<table id="board"><tr><td id="0" class="spot enabled grid_3"></td><td id="1" class="spot enabled grid_3"></td><td id="2" class="spot enabled grid_3"></td></tr><tr><td id="3" class="spot enabled grid_3"></td><td id="4" class="spot enabled grid_3"></td><td id="5" class="spot enabled grid_3"></td></tr><tr><td id="6" class="spot enabled grid_3"></td><td id="7" class="spot enabled grid_3"></td><td id="8" class="spot enabled grid_3"></td></tr></table>');
  });

  it("can show a board", function() {
    ui.showBoard(board);
    expect($("#0").html()).toEqual("X");
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

});
