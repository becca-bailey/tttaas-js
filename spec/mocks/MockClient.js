function MockClient(board, status) {
  this.mockResponse = new MockResponse(board,status);
  this.requestMade = false;
}

MockClient.prototype.postUpdatedGame = function(onCompletion, ui, game) {
  this.requestMade = true;
  onCompletion(this.mockResponse, ui, game);
};
