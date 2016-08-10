describe("GameInteractor", function() {
  var interactor;
  var mockUI;
  var mockClient;
  var game;

  beforeEach(function() {
    mockUI = new MockUI();
    mockClient = new MockClient(["X","O","","","","","","",""]);
    game = new Game();
    interactor = new GameInteractor(mockUI, game, mockClient);
  });

  describe("makeMove", function() {
    it("makes an HTTP Request", function() {
      interactor.makeMove(1);
      expect(mockClient.requestMade).toBe(true);
    });

    it("updates the board based on the response", function() {
      interactor.makeMove(1);
      expect(mockUI.shownBoard).toEqual(["X", "O", "", "", "", "", "", "", ""]);
    });
  });

  describe("displayMove", function() {
    it("disables the board spots", function() {
      interactor.displayMove(1);
      expect(mockUI.spotsEnabled).toBe(false);
    });

    it("sets the spot in the game board to the marker", function() {
      interactor.displayMove(0);
      expect(game.board).toEqual(["X","","","","","","","",""]);
    });

    it("shows the board in the UI", function() {
      interactor.displayMove(3);
      expect(mockUI.shownBoard).toEqual(["","","","X","","","","",""]);
    });
  });

  describe("endTurn", function() {
    var response;

    beforeEach(function() {
      mockResponse = new MockResponse(["","","","X","","","","",""], "in progress");
      interactor.endTurn(mockResponse, game, mockUI);
    });

    it("enables the spots", function() {
      expect(mockUI.spotsEnabled).toBe(true);
    });

    it("can update the game's board and status", function(){
      expect(game.board).toEqual(mockResponse.board);
      expect(game.status).toEqual(mockResponse.status);
    });

    it("can show the updated board in the UI", function() {
      expect(mockUI.shownBoard).toEqual(mockResponse.board);
    });
  });

  describe("endGame", function() {
    it ("can end disable the spots if the game is over", function() {
      mockResponse = new MockResponse(["X","O","","X","","O","X","",""], "player1Wins");
      interactor.endTurn(mockResponse, game, mockUI);
      expect(mockUI.spotsEnabled).toBe(false);
    });

    it ("can update the winner message if the game is over and X wins", function() {
      mockResponse = new MockResponse(["X","O","","X","","O","X","",""], "player1Wins");
      interactor.endTurn(mockResponse, game, mockUI);
      expect(mockUI.winnerText).toBe("X wins!!");
    });

    it ("can update the winner message if the game is over and O wins", function() {
      mockResponse = new MockResponse(["X","O","","X","","O","X","",""], "player2Wins");
      interactor.endTurn(mockResponse, game, mockUI);
      expect(mockUI.winnerText).toBe("O wins!!");
    });

    it ("can update the status if there is a tie", function() {
      mockResponse = new MockResponse(["X", "X", "O", "O", "X", "O", "O", "X", "X"], "tie");
      interactor.endTurn(mockResponse, game, mockUI);
      expect(mockUI.winnerText).toEqual("It's a tie!!");
    });
  });

  describe("GetWinner", function() {
    it ("can get the marker if X wins", function() {
      expect(interactor.getWinner("player1Wins")).toEqual("X");
    });

    it ("can get the marker if O wins", function() {
      expect(interactor.getWinner("player2Wins")).toEqual("O");
    });
  });

  describe("getGameAsJSON", function() {
    it ("can get the JSON for the current board", function() {
      var expectedBoard = ["","","","","","","","",""];
      expect(interactor.getGameAsJSON()).toEqual("{\"board\": " + JSON.stringify(expectedBoard) + ", \"gameType\": \"humanVsComputer\"}");
    });
  });
});
