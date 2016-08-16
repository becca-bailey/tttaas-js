var game;
var interactor;

$(document).ready(function() {
  $("#game").hide();
  $(window).resize(function() {
    $(".spot").height($(".spot").width());
  });
  $("#start_game").on("click", function(e) {
    e.preventDefault();
    var playerFactory = new PlayerFactory();
    var player1Type = $("input[name=player1]:checked").attr("class")
    var player2Type = $("input[name=player2]:checked").attr("class")
    var player1 = playerFactory.getPlayer(player1Type);
    var player2 = playerFactory.getPlayer(player2Type);
    game = new Game(player1, player2);
    interactor = new GameInteractor(new UI(), game, new HttpClient());
    interactor.startGame();
    $("#menu").hide();
    $("#game").show();
    $(".spot").height($(".spot").width());
  });

  $(".spot").on("click", function() {
    if ($(this).hasClass("enabled")) {
      id = parseInt($(this).attr("id"));
      interactor.makeMove(id);
    }
  });
  $("#play-again").on("click", function() {
    interactor.resetGame();
  });
});
