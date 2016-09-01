var GameState = require('../src/GameState');
var MockUI = require('./mocks/MockUI');
var MockClient = require('./mocks/MockClient');
var ComputerVsComputerGame = require('../src/games/ComputerVsComputerGame');

describe("ComputerVsComputerGame", function() {
  var mockUI;
  var mockClient;
  var gameState = new GameState("computerVsComputer", {type: "computer", difficulty: "hard"}, {type: "computer", difficulty: "hard"})

  beforeEach(function() {
    mockUI = new MockUI();
    mockClient = new MockClient(["X","O","","","","","","",""]);
    game = new ComputerVsComputerGame(mockClient, mockUI, gameState);
  });

  describe("play", function() {
    beforeEach(function() {
      game.play();
    });

    it ("disables spots in the beginning of the game", function() {
       expect(mockUI.spotsEnabled).toBe(false);
    });

    it ("displays the current player's turn", function() {
       expect(mockUI.statusText).toEqual("X's Turn!");
    });

    it ("makes a request to get the computer's move", function() {
      expect(mockClient.requestMade).toBe(true);
    });
  });

  describe("takeTurn", function() {
    beforeEach(function() {
      mockClient = new MockClient(["","","","","O","","","","X"]);
      game = new ComputerVsComputerGame(mockClient, mockUI, gameState);
      game.takeTurn(mockUI, new GameState(), mockClient);
    });
    it ("updates the board to show the computer's move", function() {
      expect(mockUI.shownBoard).toEqual(["","","","","O","","","","X"]);
    });

    it ("can make a request", function() {
      expect(mockClient.requestMade).toBe(true);
    });

    it ("can update the statusText if the game there is a tie", function() {
      mockClient = new MockClient(["X","X","X","","","","","",""], "tie");
      game = new ComputerVsComputerGame(mockClient, mockUI, gameState);
      game.takeTurn(mockUI, new GameState(), mockClient);
      expect(mockUI.statusText).toEqual("It's a tie!!");
    });
  });

  describe("endGame", function(){
    it ("can set the winner message if the status is a player1 win", function() {
      game.endGame("player1Wins", mockUI);
      expect(mockUI.statusText).toBe("X wins!!");
    });

    it ("can set the winner message if the status is a player2 win", function() {
      game.endGame("player2Wins", mockUI);
      expect(mockUI.statusText).toBe("O wins!!");
    });

    it ("can set the winner message if the status is a tie", function() {
      game.endGame("tie", mockUI);
      expect(mockUI.statusText).toBe("It's a tie!!");
    });
  });
});
