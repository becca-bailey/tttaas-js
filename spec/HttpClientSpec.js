var HttpClient = require('../src/HttpClient');
var GameState = require('../src/GameState');

describe("HttpClient", function() {
var client;
var player1;
var player2;
var expectedJSON;

  beforeEach(function() {
    client = new HttpClient();
    expectedJSON = {};
    player1 = {};
    player1.type = "human";
    player1.difficulty = undefined;

    player2 = {};
    player2.type = "human";
    player2.difficulty = undefined;
  });

  it("can get json for a PlayerVsPlayerGame", function() {
    var gameState = new GameState("humanVsHuman", player1, player2);

    expectedJSON.board = gameState.board;
    expectedJSON.gameType = gameState.gameType;

    expect(client.gameStateAsJSON(gameState)).toEqual(JSON.stringify(expectedJSON));
  });

  it("can get json for a playerVsComputer", function() {
    player2.type = "computer";
    player2.difficulty = "hard";
    var gameState = new GameState("humanVsComputer", player1, player2);

    expectedJSON.board = gameState.board;
    expectedJSON.gameType = gameState.gameType;
    expectedJSON.computerDifficulty = "hard";

    expect(client.gameStateAsJSON(gameState)).toEqual(JSON.stringify(expectedJSON));
  });

  it("can get json for a computerVsComputerGame", function() {
    player1.type = "computer";
    player1.difficulty = "hard";
    player2.type = "computer";
    player2.difficulty = "hard";
    var gameState = new GameState("computerVsComputer", player1, player2);

    expectedJSON.board = gameState.board;
    expectedJSON.gameType = gameState.gameType;
    expectedJSON.computerMarker = "X"
    expectedJSON.computerDifficulty = "hard";

    expect(client.gameStateAsJSON(gameState)).toEqual(JSON.stringify(expectedJSON));
  });

  it("can get json for a computerVsComputerGame when X is easy", function() {
    player1.type = "computer";
    player1.difficulty = "easy";
    player2.type = "computer";
    player2.difficulty = "hard";
    var gameState = new GameState("computerVsComputer", player1, player2);

    expectedJSON.board = gameState.board;
    expectedJSON.gameType = gameState.gameType;
    expectedJSON.computerMarker = "X"
    expectedJSON.computerDifficulty = "easy";

    expect(client.gameStateAsJSON(gameState)).toEqual(JSON.stringify(expectedJSON));
  });

  it("can get json for a computerVsComputerGame when it's O's turn", function() {
    player1.type = "computer";
    player1.difficulty = "easy";
    player2.type = "computer";
    player2.difficulty = "hard";
    var gameState = new GameState("computerVsComputer", player1, player2);
    gameState.isXTurn = false;

    expectedJSON.board = gameState.board;
    expectedJSON.gameType = gameState.gameType;
    expectedJSON.computerMarker = "O"
    expectedJSON.computerDifficulty = "hard";

    expect(client.gameStateAsJSON(gameState)).toEqual(JSON.stringify(expectedJSON));
  });


});
