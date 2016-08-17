describe("ComputerVsComputerGame", function() {
  var mockUI;
  var mockClient;

  beforeEach(function() {
    mockUI = new MockUI();
    mockClient = new MockClient(["X","O","","","","","","",""]);
    game = new ComputerVsComputerGame(mockClient, mockUI);
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
      game = new ComputerVsComputerGame(mockClient, mockUI);
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
      game = new ComputerVsComputerGame(mockClient, mockUI);
      game.takeTurn(mockUI, new GameState(), mockClient);
      expect(mockUI.statusText).toEqual("It's a tie!!");
    });
  });
});
