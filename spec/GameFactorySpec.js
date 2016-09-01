var GameFactory = require('../src/GameFactory');
var MockClient = require('./mocks/MockClient');
var UI = require('../src/UI');
var PlayerVsPlayerGame = require('../src/games/PlayerVsPlayerGame');
var PlayerVsComputerGame = require('../src/games/PlayerVsComputerGame');
var ComputerVsPlayerGame = require('../src/games/ComputerVsPlayerGame');
var ComputerVsComputerGame = require('../src/games/ComputerVsComputerGame');

describe("GameFactory", function() {
  var computer = {type: "computer", difficulty: "hard"};
  var human = {type: "human", difficulty: "hard"};

  beforeEach(function() {
    factory = new GameFactory(new MockClient(), new UI());
  });
  it("returns a PlayerVsPlayer game if both players have type 'human'", function() {
    game = factory.getGame(human, human);
    expect(game).toEqual(jasmine.any(PlayerVsPlayerGame));
  });

  it("returns a PlayerVsComputer game when given players with type 'human' and 'computer'", function() {
    game = factory.getGame(human, computer);
    expect(game).toEqual(jasmine.any(PlayerVsComputerGame));
  });

  it("returns a ComputerVsPlayer game when given players with type 'computer' and 'human'", function() {
    game = factory.getGame(computer, human);
    expect(game).toEqual(jasmine.any(ComputerVsPlayerGame));
  });

  it("returns a ComputerVsComputer game if both players have type 'computer'", function() {
    game = factory.getGame(computer, computer);
    expect(game).toEqual(jasmine.any(ComputerVsComputerGame));
  });
});
