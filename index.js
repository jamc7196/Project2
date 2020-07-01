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

var top3VgmYear = {
  url: "http://127.0.0.1:5000/api/v1/top3vgs_peryear",
  type: "GET",
  dataType: "json",
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function init() {
  $.ajax(top3VgmYear).done((top3vdgYr) => {
    var year = [];
    top3vdgYr.forEach((element) => {
      year.push(element.year);
    });

    var uniqueYear = year.filter(function (item, pos) {
      return year.indexOf(item) == pos;
    });

    uniqueYear.forEach((object) =>
      d3.select("#selDataset").append("option").text(object)
    );

    var dropdown_value = d3.select("#selDataset").property("value");

    top3vdgYr.forEach((element) => {
      if (dropdown_value == element.year) {
        d3.select("#sample-metadata")
          .append("p")
          .text(`${element.name} (${element.company})`);
      }
    });
  });
}

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
  });
});

function change() {
  $.ajax(top3VgmYear).done((top3vdgYr) => {
    var dropdown_value = d3.select("#selDataset").property("value");
    d3.select("#sample-metadata").text("");

    top3vdgYr.forEach((element) => {
      if (dropdown_value == element.year) {
        d3.select("#sample-metadata")
          .append("p")
          .text(`${element.name} (${element.company})`);
      }
    });
  });
}

d3.selectAll("#selDataset").on("change", change);
init();
