describe("Game", function() {
  var mockUI;
  var mockClient;

  beforeEach(function() {
    mockUI = new MockUI();
    mockClient = new MockClient(["X","O","","","","","","",""]);
    game = new Game(mockClient, mockUI);
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
