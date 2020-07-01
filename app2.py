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
genre_globalsales_results = db.genre_globalsales.find({}, {"_id": 0})
genre_sales_results = db.genre_sales.find({}, {"_id": 0})
genres_results = db.genres.find({}, {"_id": 0})
global_sales_results = db.global_sales.find({}, {"_id": 0})
platforms_results = db.platforms.find({}, {"_id": 0})
top3genres_percomp_results = db.top3genres_percomp.find({}, {"_id": 0})
top3genres_peryear_sales_results = db.top3genres_peryear.find({}, {"_id": 0})
top3gensales_percomp_results = db.top3gensales_percomp.find({}, {"_id": 0})
top3vgs_peryear_results = db.top3vgs_peryear.find({}, {"_id": 0})
totglobsales_percomp_results = db.totglobsales_percomp.find({}, {"_id": 0})


# Create list to storage json
games_json = []
genre_globalsales_json = []
genre_sales_json = []
genres_json = []
global_sales_json = []
platforms_json = []
top3genres_percomp_json = []
top3genres_peryear_json = []
top3gensales_percomp_json = []
top3vgs_peryear_json = []
totglobsales_percomp_json = []


# Json format data
list_data(games_json, games_results)
list_data(genre_globalsales_json, genre_globalsales_results)
list_data(genre_sales_json, genre_sales_results)
list_data(genres_json, genres_results)
list_data(global_sales_json, global_sales_results)
list_data(platforms_json, platforms_results)
list_data(top3genres_percomp_json, top3genres_percomp_results)
list_data(top3genres_peryear_json, top3genres_peryear_sales_results)
list_data(top3gensales_percomp_json, top3gensales_percomp_results)
list_data(top3vgs_peryear_json, top3vgs_peryear_results)
list_data(totglobsales_percomp_json, totglobsales_percomp_results)

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


@app.route('/')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def home():

    print('Server received request for "Home" page...')
    return (
        f'<h1> Hi! </h1><br>'
        f'Here are the API routes available <br>'
        f'<br>For Games API: /api/v1/games <br>'
        f'For Genre Global Sales API: /api/v1/genre_globalsales <br>'
        f'For Genre Sales API: /api/v1/genre_sales <br>'
        f'For Genres API: /api/v1/genres <br>'
        f'For Global Sales API: /api/v1/global_sales <br>'
        f'For Platforms API: /api/v1/platforms <br>'
        f'For Top 3 Genres Per Company API: /api/v1/top3genres_percomp <br>'
        f'For Top 3 Genres Per Year API: /api/v1/top3genres_peryear <br>'
        f'For Top 3 Genres Sales Per Company API: /api/v1/top3gensales_percomp <br>'
        f'For Top 3 Videogames Per Year API: /api/v1/top3vgs_peryear <br>'
        f'For Total Global Sales Per Company API: /api/v1/totglobsales_percomp <br>'
    )


@app.route('/api/v1/games')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def games():

    return jsonify(games_json)


@app.route('/api/v1/genre_globalsales')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def genre_globalsales():

    return jsonify(genre_globalsales_json)


@app.route('/api/v1/genre_sales')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def genre_sales():

    return jsonify(genre_sales_json)


@app.route('/api/v1/genres')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def genres():

    return jsonify(genres_json)


@app.route('/api/v1/global_sales')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def global_sales():

    return jsonify(global_sales_json)


@app.route('/api/v1/platforms')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def platforms():

    return jsonify(platforms_json)


@app.route('/api/v1/top3genres_percomp')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def top3genres_percomp():

    return jsonify(top3genres_percomp_json)


@app.route('/api/v1/top3genres_peryear')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def top3genres_peryear():

    return jsonify(top3genres_peryear_json)


@app.route('/api/v1/top3gensales_percomp')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def top3gensales_percomp():

    return jsonify(top3gensales_percomp_json)


@app.route('/api/v1/top3vgs_peryear')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def top3vgs_peryear():

    return jsonify(top3vgs_peryear_json)


@app.route('/api/v1/totglobsales_percomp')
@cross_origin(origin='localhost', headers=['Content- Type', 'Authorization'])
def totglobsales_percomp():

    return jsonify(totglobsales_percomp_json)


if __name__ == "__main__":
        # @TODO: Create your app.run statement here
    app.run(debug=True)
