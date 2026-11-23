"""A4 Problem 2: a small Web API over the parliament database.

Run:  python app.py, then open the URL http://127.0.0.1:7000/ to test the connection
After implementing the API, open the testing URL according to the testcases in the Jupyter notebook, e.g., http://127.0.0.1:7000/getByProvince/PE
"""
from pydoc import doc

from flask import Flask, jsonify, abort
from flask_pymongo import PyMongo
import time, datetime
from datetime import datetime

app = Flask(__name__)

# Update the below configuration with your existing MongoDB details
# Inside the course Docker container use mongodb://mongodb:27017/parliament 
# Otherwise outside the container use mongodb://localhost:27017/parliament 

app.config["MONGO_URI"] = "mongodb://mongodb:27017/parliament"

mongo = PyMongo(app)

# MP roles store the province name; the URL takes the two-letter code.
PROVINCES = {
    "AB": "Alberta", "BC": "British Columbia", "MB": "Manitoba", "NB": "New Brunswick",
    "NL": "Newfoundland and Labrador", "NS": "Nova Scotia", "NT": "Northwest Territories",
    "NU": "Nunavut", "ON": "Ontario", "PE": "Prince Edward Island", "QC": "Quebec",
    "SK": "Saskatchewan", "YT": "Yukon",
}

@app.route('/')
def example():
    # Note that the regex syntax in Pymongo is different from the JSON
    res = mongo.db.people.find({"name": {'$regex':' Martin$'} })
    return jsonify(res)


# a. Current MPs of a province: [{"name", "riding", "party"}], sorted by riding.
@app.route("/getByProvince/<province_code>")
def getByProvince(province_code):
    """
        This HTTP method takes province_code as input, and returns the name, district, and party 
        of each current Representative of the given province (province_code) in the format of 
        {"name": "...", "district": ..., "party": "..." } and sorts the result according to the district.
    """
    # COMPLETE THE PIPELINE DEFINITION by filling in your code
    # Feel free to add code outside the pipeline if needed, e.g., for preprocessing or validation
    province = PROVINCES.get(province_code.upper())
    if province is None:
        abort(404)
    
    pipeline = [
    ]
    # do not change the aggregate query below
    res = mongo.db.people.aggregate(pipeline)
    return jsonify(res)


# b. Mark the roles that are over as of a date given in the URL ("YYYY-MM-DD"), e.g.
#    /update/ca:person:senate:207927/2027-07-07. 
@app.route("/update/<lid>/<as_of>")
def update(lid, as_of):
    """
    Args:
        lid: the legislator's _id
        as_of: the date to check against in the format "YYYY-MM-DD"

    Returns:
        {"res": "current"} if the legislator will still be serving in the parliament
        {"res": person object} if the legislator's information needs to be updated
        if the lid is not found, directly call `abort(404, description=f"Legislator {lid} not found")`
        
 	Same as in A3, requests that change data should normally use HTTP POST or PUT, but we use GET here so that you can test them in a browser.
  
	NOTE: either create a separate copy of parliament db before you work on this problem,
 	or remember to reload the db contents if you need to test the queries
    """
    # REPLACE THE NEXT LINE to find the given legislator
    person = None
    if person is None:
        abort(404, description=f"Legislator {lid} not found")

    # IMPLEMENT THE LOGIC to mark every current role that has ended before as_of
    need_update = False

    if not need_update:
        return jsonify({"res": "current"}), 200
    
    # COMPLETE THE STATEMENT BELOW to update the roles and return the updated person
    res = mongo.db.people.update_one()
	
	# Check if the update statement finds a legislator (actually we already check that above)
    if res.matched_count == 0:
        abort(404, description=f"Legislator {lid} not found")
    
    return jsonify(person), 200


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=7000)
