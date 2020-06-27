#Importing dependencies
from flask import Flask, jsonify
import requests
import json
import pymongo

#Create a connection to MongoDB
conn = 'mongodb://localhost:27017'

genresUrl = "https://rawg-video-games-database.p.rapidapi.com/genres"
platformsUrl = "https://rawg-video-games-database.p.rapidapi.com/platforms"

headers = {
    'x-rapidapi-host': "rawg-video-games-database.p.rapidapi.com",
    'x-rapidapi-key': "ec79643d13msh4903c20a1769647p1f952bjsnf0ece5bb5548"
}

app = Flask(__name__)

#Defining endpoints
#Querying genders in API
@app.route("/genres")
def genres():
    #Request to API endpoint
    response = requests.request("GET", genresUrl, headers=headers).json()
    results = response["results"]

    #Client for mongo
    client = pymongo.MongoClient(conn)
    db = client.videogames
    genres = db.genres

    status = buildMongoData(results, genres)

    return status

#Querying platforms in API
@app.route("/platforms")
def platforms():
    #Request to API endpoint
    response = requests.request("GET", platformsUrl, headers=headers).json()
    results = response["results"]

    #Client for mongo
    client = pymongo.MongoClient(conn)
    db = client.videogames
    platforms = db.platforms

    status = buildMongoData(results, platforms)

    while(response["next"]):
        response = requests.request("GET", response["next"], headers=headers).json()
        results = response["results"]
        status = buildMongoData(results, platforms)      

    return status

#
#@params: results -> the response received from the API endpoint
#         collection -> the object of mongo to add the data
#
def buildMongoData(results, collection):
    for element in results:
        topGames = []
        for x in range(3):
            topGames.append(element["games"][x])
        gamesCount = element["games_count"]
        id = element["id"]
        name = element["name"]
        
        #Document for Mongo db
        data = {"id":id, "name":name, "games_count":gamesCount, "top_games": topGames}

        #Adding document to collection
        collection.insert(data)

    return "200_OK"


if __name__ == "__main__":
    app.run(debug=True)