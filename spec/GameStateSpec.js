var GameState = require('../src/GameState');

describe("GameState", function() {
  var gameState;

  beforeEach(function() {
    gameState = new GameState();
  });

  it("has a board", function() {
    expect(gameState.board).toEqual(["", "", "", "", "", "", "", "", ""]);
  });

  it("has a status", function() {
    expect(gameState.status).toEqual("in progress");
  });

  it("should be able to set a spot on its board to a marker", function() {
    gameState.updateBoard(["X", "", "", "", "", "", "", "", ""]);
    expect(gameState.board).toEqual(["X", "", "", "", "", "", "", "", ""]);
  });

  it('can update the status of the game', function() {
    gameState.updateStatus("player1Wins");
    expect(gameState.status).toEqual("player1Wins");
  });

  it("can switch the turn", function() {
    expect(gameState.isXTurn).toBe(true);
    gameState.switchTurn();
    expect(gameState.isXTurn).toBe(false);
  });

  it("can return the current player's marker", function() {
    expect(gameState.getPlayerMarker()).toEqual("X");
    gameState.switchTurn();
    expect(gameState.getPlayerMarker()).toEqual("O");
  });

  it("returns true if the game is over", function() {
    expect(gameState.isOver()).toBe(false);

    gameState.updateStatus("tie");
    expect(gameState.isOver()).toBe(true);

    gameState.updateStatus("player1Wins");
    expect(gameState.isOver()).toBe(true);
  });
});
