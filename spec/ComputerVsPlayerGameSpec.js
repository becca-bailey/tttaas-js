describe("ComputerVsPlayerGame", function() {
  var mockUI;
  var mockClient;

  beforeEach(function() {
    mockUI = new MockUI();
    mockClient = new MockClient(["","","","","","","","","X"]);
    game = new ComputerVsPlayerGame(mockClient, mockUI);
  });

  describe("computerTurn", function() {
    beforeEach(function() {
      game.computerTurn();
    });

    it ("disables the spots", function() {
      expect(mockUI.spotsEnabled).toBe(false);
    });

    it ("displays the computer's turn", function() {
       expect(mockUI.statusText).toEqual("Computer is thinking...");
    });
  });

  describe("play", function() {
    beforeEach(function() {
      game.play();
    });

    it ("enables the spots when it is the human player's turn", function() {
      expect(mockUI.spotsEnabled).toBe(true);
    });

    it ("can display a human player's turn", function() {
      expect(mockUI.statusText).toEqual("Your turn!");
    });

    it ("sends a request to get the computer's move", function() {
      expect(mockClient.requestMade).toBe(true);
    });
  });

  describe("takeTurn", function() {
    it ("updates the board to show the human and the computer's move", function() {
      mockClient = new MockClient(["","","","","O","","","","X"]);
      game = new ComputerVsPlayerGame(mockClient, mockUI);
      game.takeTurn(8);
      expect(mockUI.shownBoard).toEqual(["","","","","O","","","","X"]);
    });

    it ("can make a request", function() {
      game.takeTurn(1);
      expect(mockClient.requestMade).toBe(true);
    });

    it ("does not switch the current player at the end of a turn", function() {
      game.gameState.isXTurn = true;
      game.takeTurn(1);
      expect(game.gameState.isXTurn).toBe(true);
      expect(mockUI.statusText).toEqual("Computer is thinking...");
    });

    it ("can disable the board spots if the game is over", function() {
      mockClient = new MockClient(["X","X","X","","","","","",""], "player1Wins");
      game = new ComputerVsPlayerGame(mockClient, mockUI);
      game.takeTurn(1);
      expect(mockUI.spotsEnabled).toBe(false);
    });

    it ("can update the statusText if the game is over and X wins", function() {
      mockClient = new MockClient(["X","X","X","","","","","",""], "player1Wins");
      game = new ComputerVsPlayerGame(mockClient, mockUI);
      game.takeTurn(1);
      expect(mockUI.statusText).toEqual("X wins!!");
    });

    it ("can update the statusText if the game is over and O wins", function() {
      mockClient = new MockClient(["O","O","O","","","","","",""], "player2Wins");
      game = new ComputerVsPlayerGame(mockClient, mockUI);
      game.takeTurn(1);
      expect(mockUI.statusText).toEqual("O wins!!");
    });
  });
});
