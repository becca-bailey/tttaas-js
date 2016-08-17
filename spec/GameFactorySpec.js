describe("GameFactory", function() {

  beforeEach(function() {
    factory = new GameFactory(new MockClient(), new UI());
  });
  it("returns a PlayerVsPlayer game if both players have type 'human'", function() {
    game = factory.getGame("human", "human");
    expect(game).toEqual(jasmine.any(PlayerVsPlayerGame));
  });

  it("returns a PlayerVsComputer game when given players with type 'human' and 'computer'", function() {
    game = factory.getGame("human", "computer");
    expect(game).toEqual(jasmine.any(PlayerVsComputerGame));
  });

  it("returns a ComputerVsPlayer game when given players with type 'computer' and 'human'", function() {
    game = factory.getGame("computer", "human");
    expect(game).toEqual(jasmine.any(ComputerVsPlayerGame));
  });

  it("returns a ComputerVsComputer game if both players have type 'computer'", function() {
    game = factory.getGame("computer", "computer");
    expect(game).toEqual(jasmine.any(ComputerVsComputerGame));
  });
});
