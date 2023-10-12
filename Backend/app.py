from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADER'] = 'Content-Type' 



@app.route("/api/login", methods=['POST'])
@cross_origin(origins='*')
def login():
    data = request.json
    
    userName = data.get('userName')
    password = data.get('password')
    
    #URL
    url = "mongodb+srv://"+userName+":"+password+"@testcluster.7phucdo.mongodb.net/?retryWrites=true&w=majority"
    
    # Create a new client and connect to the server
    client = MongoClient(url, server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)



    return jsonify({"message": "Login successful"})
    


if __name__ == '__main__':
    app.run()
