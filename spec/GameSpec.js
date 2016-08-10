describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it("has a board", function() {
    expect(game.board).toEqual(["", "", "", "", "", "", "", "", ""]);
  });

  it("has a status", function() {
    expect(game.status).toEqual("inProgress");
  });

  it("should be able to set a spot on its board to a marker", function() {
    game.setSpotToMarker(0, "X");
    expect(game.board).toEqual(["X", "", "", "", "", "", "", "", ""]);
  });
});
