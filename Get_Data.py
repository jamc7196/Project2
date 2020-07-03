# Importing dependencies
import requests
import pymongo
from config import API_KEY
import os
import pandas as pd


def buildMongoData(results, collection):
    data_all = []
    data_dict = {}
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

        data_all.append(data)

    # Adding document to collection
    data_dict['data'] = data_all
    collection.update({}, data_dict, upsert=True)

# Function to save game in MongoDB


def Insert_MongoDB(response, list):
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

    list.append(data)
    # data_dict['data'] = data_all
    # # collection.insert(data)
    # collection.update({}, data_dict, upsert=True)


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
genres_results = genres.find({}, {'_id': 0})
# Save all games in a list
list_games = []

# Get a list for all games
for result in genres_results:
    data_indx = result['data']
    for item in data_indx:
        for index in range(3):
            game = item['top_games'][index]['id']
            if game not in list_games:
                list_games.append(item['top_games'][index]['id'])

# print(list_games)
# print(json.dumps(response, indent=4, sort_keys=True))

# Get games with specific ID
data_all = []
for item in list_games:
    games_url = f"https://rawg-video-games-database.p.rapidapi.com/games/{item}"
    response = requests.request("GET", games_url, headers=headers).json()
    Insert_MongoDB(response, data_all)

data_dict = {}
data_dict['data'] = data_all
games.update({}, data_dict, upsert=True)


# Path where CSV files are stored
csv_path = os.path.join("Resources", "CSV")

# # Get a list of all files inside the path
files = os.listdir(csv_path)

# Loop files, separate the name and save it as json, and in a mongo collection
for file in files:
    input_path = os.path.join("Resources", "CSV", file)
    name_spl = file.split(".")
    collection = db[name_spl[0]]
    output_path = os.path.join("Resources", "JSON", f'{name_spl[0]}.json')

    csv = pd.read_csv(input_path)
    data = csv.to_dict(orient='records')

    data_all = []
    data_all.append(data)
    data_dict['data'] = data_all
    collection.update({}, data_dict, upsert=True)
    # collection.insert_many(data)
    csv.to_json(output_path)
