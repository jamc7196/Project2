function pieChart(data){
    var labels = [];
    var values = [];
    data.forEach(element => {
        labels.push(element.Genre);
        var mean = 0;
        element.Metacritics.forEach(critic => {
            mean += critic;
        });
        mean = mean/3;
        mean = Math.round(mean * 100) / 100;
        values.push(mean);
    });
    console.log(labels);
    console.log(values);

    var trace1 = {
        labels:labels,
        values:values,
        type:"pie"
    };

    var data = [trace1];

    var layout = {
        title: "MetaCritics by Genre"
    };

    Plotly.newPlot("pieplot", data, layout);
}

var data = [
    {
      "Genre": "Action",
      "Ratings": [
        4.48,
        4.67,
        4.06
      ],
      "Metacritics": [
        97,
        93,
        86
      ]
    },
    {
      "Genre": "Indie",
      "Ratings": [
        4.15,
        4.02,
        3.98
      ],
      "Metacritics": [
        88,
        86,
        83
      ]
    },
    {
      "Genre": "Adventure",
      "Ratings": [
        4.48,
        4.67,
        4.06
      ],
      "Metacritics": [
        97,
        93,
        86
      ]
    },
    {
      "Genre": "RPG",
      "Ratings": [
        4.67,
        4.41,
        4.05
      ],
      "Metacritics": [
        93,
        94,
        89
      ]
    },
    {
      "Genre": "Strategy",
      "Ratings": [
        4.31,
        4.2,
        3.68
      ],
      "Metacritics": [
        90,
        89,
        80
      ]
    },
    {
      "Genre": "Shooter",
      "Ratings": [
        4.62,
        4.1,
        4.05
      ],
      "Metacritics": [
        95,
        89,
        89
      ]
    },
    {
      "Genre": "Casual",
      "Ratings": [
        3.11,
        3.15,
        4.09
      ],
      "Metacritics": [
        73,
        62,
        81
      ]
    },
    {
      "Genre": "Simulation",
      "Ratings": [
        3.15,
        3.8,
        4.39
      ],
      "Metacritics": [
        80,
        83,
        89
      ]
    },
    {
      "Genre": "Puzzle",
      "Ratings": [
        4.62,
        4.52,
        4.15
      ],
      "Metacritics": [
        95,
        90,
        88
      ]
    },
    {
      "Genre": "Arcade",
      "Ratings": [
        4.33,
        3.61,
        3.11
      ],
      "Metacritics": [
        85,
        80,
        73
      ]
    },
    {
      "Genre": "Platformer",
      "Ratings": [
        4.15,
        3.98,
        4.01
      ],
      "Metacritics": [
        88,
        83,
        86
      ]
    },
    {
      "Genre": "Racing",
      "Ratings": [
        4.02,
        3.32,
        3.77
      ],
      "Metacritics": [
        86,
        80,
        86
      ]
    },
    {
      "Genre": "Sports",
      "Ratings": [
        4.02,
        3.32,
        3.77
      ],
      "Metacritics": [
        86,
        80,
        86
      ]
    },
    {
      "Genre": "Massively Multiplayer",
      "Ratings": [
        3.1,
        3.64,
        3.47
      ],
      "Metacritics": [
        90,
        82,
        70
      ]
    },
    {
      "Genre": "Family",
      "Ratings": [
        4.34,
        3.39,
        3.67
      ],
      "Metacritics": [
        92,
        80,
        73
      ]
    },
    {
      "Genre": "Fighting",
      "Ratings": [
        3.61,
        3.86,
        3.24
      ],
      "Metacritics": [
        80,
        76,
        null
      ]
    },
    {
      "Genre": "Board Games",
      "Ratings": [
        3.29,
        2.76,
        3.68
      ],
      "Metacritics": [
        null,
        null,
        80
      ]
    },
    {
      "Genre": "Educational",
      "Ratings": [
        4.02,
        3.46,
        3.67
      ],
      "Metacritics": [
        90,
        71,
        83
      ]
    },
    {
      "Genre": "Card",
      "Ratings": [
        3.41,
        3.68,
        4.38
      ],
      "Metacritics": [
        71,
        80,
        87
      ]
    }
  ];

pieChart(data);