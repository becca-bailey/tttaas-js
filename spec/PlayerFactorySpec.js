describe("PlayerFactory", function() {

  beforeEach(function() {
    factory = new PlayerFactory();
  });

  it("return a new HumanPlayer if given 'human'", function() {
    human = factory.getPlayer("human");
    expect(human).toEqual(jasmine.any(HumanPlayer));
  });

  it("return a new ComputerPlayer if given 'computer'", function() {
    human = factory.getPlayer("computer");
    expect(human).toEqual(jasmine.any(ComputerPlayer));
  });
});
