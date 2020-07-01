# Importing dependencies
import requests
import pymongo
from config import API_KEY


def buildMongoData(results, collection):
    for element in results:
        topGames = []
        for x in range(3):
            topGames.append(element["games"][x])
        gamesCount = element["games_count"]
        id = element["id"]
        name = element["name"]

        # Document for Mongo db
        data = {"id": id, "name": name,
                "games_count": gamesCount, "top_games": topGames}

        # Adding document to collection
        collection.insert(data)

# Function to save game in MongoDB


def Insert_MongoDB(response, collection):
    id = response['id']
    name = response['name']
    metacritic = response['metacritic']
    metacritic_platforms = response['metacritic_platforms']
    rating = response['rating']
    ratings = response['ratings']

    data = {
        "id": id,
        "name": name,
        "metacritic": metacritic,
        "metacritic_platforms": metacritic_platforms,
        "rating": rating,
        "ratings": ratings
    }

    collection.insert(data)


# Create a connection to MongoDB
conn = 'mongodb://localhost:27017'

genresUrl = "https://rawg-video-games-database.p.rapidapi.com/genres"
platformsUrl = "https://rawg-video-games-database.p.rapidapi.com/platforms"

headers = {
    'x-rapidapi-host': "rawg-video-games-database.p.rapidapi.com",
    'x-rapidapi-key': API_KEY
}

# Request to API endpoint
response = requests.request("GET", genresUrl, headers=headers).json()
results = response["results"]

# Client for mongo
client = pymongo.MongoClient(conn)
db = client.videogames

platforms = db.platforms
genres = db.genres
games = db.games

buildMongoData(results, genres)

# Request to API endpoint
response = requests.request("GET", platformsUrl, headers=headers).json()
results = response["results"]

buildMongoData(results, platforms)

while(response["next"]):
    response = requests.request(
        "GET", response["next"], headers=headers).json()
    results = response["results"]
    buildMongoData(results, platforms)

# Save genres data from MongOdb
genres_results = genres.find()
# Save all games in a list
list_games = []

# Get a list for all games
for result in genres_results:
    for index in range(3):
        game = result['top_games'][index]['id']
        if game not in list_games:
            list_games.append(result['top_games'][index]['id'])

# print(list_games)
# print(json.dumps(response, indent=4, sort_keys=True))

# Get games with specific ID
for item in list_games:
    games_url = f"https://rawg-video-games-database.p.rapidapi.com/games/{item}"
    response = requests.request("GET", games_url, headers=headers).json()
    Insert_MongoDB(response, games)
