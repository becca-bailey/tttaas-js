var MockResponse = require('./MockResponse');

function MockClient(board, status) {
  this.mockResponse = new MockResponse(board,status);
  this.requestMade = false;
}

MockClient.prototype.postUpdatedGame = function(onCompletion, ui, game) {
  this.requestMade = true;
  onCompletion(this.mockResponse, ui, game);
};

MockClient.prototype.getGameStatus = function(onCompletion, ui, game) {
  this.requestMade = true;
  onCompletion(this.mockResponse, ui, game);
};

module.exports = MockClient;
