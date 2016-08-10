function HttpClient() {

}

HttpClient.prototype.makeRequest = function(data, onCompletion, ui, game) {
  $.ajax({
          url: "http://stormy-savannah-24890.herokuapp.com/game",
          crossOrigin: true,
          type: "POST",
          dataType: "json",
          data: data,
          success: function(response) {
            onCompletion(response, ui, game)
          },
          error: function() {
            HttpClient.prototype.makeRequest(data, onCompletion, ui, game);
          }
        });
};
