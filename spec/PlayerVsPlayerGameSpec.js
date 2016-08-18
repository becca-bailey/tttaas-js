describe("PlayerVsPlayerGame", function() {
  var mockUI;
  var mockClient;

  beforeEach(function() {
    mockUI = new MockUI();
    mockClient = new MockClient(["X","","","","","","","",""], "in progress");
    game = new PlayerVsPlayerGame(mockClient, mockUI);
  });
  describe("play", function() {

    beforeEach(function() {
      game.play();
    });

    it ("can enable the spots at the start of a game", function() {
      expect(mockUI.spotsEnabled).toBe(true);
    });

    it ("can display the current players turn", function() {
      expect(mockUI.statusText).toEqual("X's Turn!");
    });
  });

  describe("takeTurn", function() {
    it ("can make a move and show the board", function() {
      game.takeTurn(0);
      expect(mockUI.shownBoard).toEqual(["X","","","","","","","",""]);
    });

    it ("can make a request", function() {
      game.takeTurn(1);
      expect(mockClient.requestMade).toBe(true);
    });

    it ("can switch the turn and show the appropriate message", function() {
      game.gameState.isXTurn = true;
      game.takeTurn(1);
      expect(game.gameState.isXTurn).toBe(false);
      expect(mockUI.statusText).toEqual("O's Turn!");
    });

    it ("can re-enable the spots", function() {
      mockUI.spotsEnabled = false;
      game.takeTurn(2);
       expect(mockUI.spotsEnabled).toBe(true);
    });

    it ("can disable the board spots if the game is over", function() {
      mockClient = new MockClient(["X","X","X","","","","","",""], "player1Wins");
      game = new PlayerVsPlayerGame(mockClient, mockUI);
      game.takeTurn(1);
      expect(mockUI.spotsEnabled).toBe(false);
    });

    it ("can update the statusText if the game is over and X wins", function() {
      mockClient = new MockClient(["X","X","X","","","","","",""], "player1Wins");
      game = new PlayerVsPlayerGame(mockClient, mockUI);
      game.takeTurn(1);
      expect(mockUI.statusText).toEqual("X wins!!");
    });

    it ("can update the statusText if the game is over and O wins", function() {
      mockClient = new MockClient(["O","O","O","","","","","",""], "player2Wins");
      game = new PlayerVsPlayerGame(mockClient, mockUI);
      game.takeTurn(1);
      expect(mockUI.statusText).toEqual("O wins!!");
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
