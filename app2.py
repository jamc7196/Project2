from flask import Flask, jsonify, json
import pymongo
from flask_cors import CORS, cross_origin

# Function to extract data from DB


def list_data(list, data):
    for result in data:
        list.append(result)


# Create a connection to MongoDB
conn = 'mongodb://localhost:27017'

# Client for mongo
client = pymongo.MongoClient(conn)

# Database
db = client.videogames

# Collections
games_results = db.games.find({}, {"_id": 0})
genres_results = db.genres.find({}, {"_id": 0})

# Create list to storage json
games_json = []
genres_json = []

# Json format data
list_data(games_json, games_results)
list_data(genres_json, genres_results)

# for result in games_results:
#     data.append(result)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:5000"}})

#################################################
# Flask Routes
#################################################


@app.route('/api/v1/games')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def games():

    return jsonify(games_json)


@app.route('/api/v1/genres')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def genres():

    return jsonify(genres_json)


if __name__ == "__main__":
        # @TODO: Create your app.run statement here
    app.run(debug=True)
