function PlayerFactory() { }

PlayerFactory.prototype.getPlayer = function(playerType) {
  if (playerType === "human") {
    return new HumanPlayer();
  } else if (playerType === "computer") {
    return new ComputerPlayer();
  }
}
