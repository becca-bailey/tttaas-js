var GameState = require('../src/GameState');

describe("GameState", function() {
  var gameState;
  var initialBoard = ["", "", "", "", "", "", "", "", ""];

  beforeEach(function() {
    var player1 = {type: "human"};
    var player2 = {type: "computer", difficulty: "easy"};
    gameState = new GameState("humanVsComputer", player1, player2);
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

  it("returns the computer difficulty", function() {
    gameState.isXTurn = false;
    expect(gameState.getComputerDifficulty()).toEqual("easy");
  });

  describe("getFields", function() {
    it("returns two fields for a playerVsPlayerGame", function() {
      var player1 = {type: "human"};
      var player2 = {type: "human"};
      gameState = new GameState("humanVsHuman", player1, player2);
      var expectedFields = {"board": initialBoard, "gameType": "humanVsHuman"};
      expect(gameState.getFields()).toEqual(expectedFields);
    });

    it("returns three fields for a playerVsComputerGame", function() {
      gameState.isXTurn = false;
      var expectedFields = {"board": initialBoard, "gameType": "humanVsComputer", "computerDifficulty": "easy"};
      expect(gameState.getFields()).toEqual(expectedFields);
    });

    it("returns three fields for a computerVsPlayerGame", function() {
      var player1 = {type: "computer", difficulty: "hard"};
      var player2 = {type: "human"};
      gameState = new GameState("humanVsComputer", player1, player2);
      gameState.isXTurn = true;
      var expectedFields = {"board": initialBoard, "gameType": "humanVsComputer", "computerDifficulty": "hard"};
      expect(gameState.getFields()).toEqual(expectedFields);
    });

    it("returns four fields for a computerVsComputerGame", function() {
      var player1 = {type: "computer", difficulty: "hard"};
      var player2 = {type: "computer", difficulty: "easy"};
      gameState = new GameState("computerVsComputer", player1, player2);
      var expectedFields = {"board": initialBoard, "gameType": "computerVsComputer", "computerMarker": "X", "computerDifficulty": "hard"};
      expect(gameState.getFields()).toEqual(expectedFields);
    });
  });
});
