var genres = {
  url: "http://127.0.0.1:5000/api/v1/genres",
  type: "GET",
  dataType: "json",
};

var games = {
  url: "http://127.0.0.1:5000/api/v1/games",
  type: "GET",
  dataType: "json",
};

$.ajax(genres).done((genresData) => {
  $.ajax(games).done((gamesData) => {
    // console.log(genresData);
    // console.log(gamesData);
    var all = [];
    genresData.forEach((gen) => {
      var genre = gen.name;
      var ratings = [];
      var metacritics = [];
      for (let index = 0; index < 3; index++) {
        var gameId = gen.top_games[index].id;
        gamesData.forEach((gm) => {
          if (gameId == gm.id) {
            ratings.push(gm.rating);
            metacritics.push(gm.metacritic);
          }
        });
      }
      // all.push({ [genre]: gamesId });
      all.push({
        Genre: genre,
        Ratings: ratings,
        Metacritics: metacritics,
      });
    });

    console.log(all);
  });
});
