$(document).ready(function() {
  var interactor = new GameInteractor(new UI(), new Game(), new HttpClient());
  $(".spot").on("click", function() {
    if ($(this).hasClass("enabled")) {
      id = parseInt($(this).attr("id"));
      interactor.makeMove(id);
    }
  });
});
