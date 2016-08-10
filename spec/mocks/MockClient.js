function MockClient(board, status) {
  this.mockResponse = new MockResponse(board,status);
  this.requestMade = false;
}

MockClient.prototype.makeRequest = function(data, onCompletion, ui, game) {
  this.requestMade = true;
  onCompletion(this.mockResponse, game, ui);
};
