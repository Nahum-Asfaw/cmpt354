// currently liberal -> end : null and name: liberal
// previously diff affiliation: end != null and name != liberal
printjson(
db.people.aggregate([
    {$match: //currently liberal
            { $and: 
                [ { "affiliations.name": "Liberal"}, { "affiliations.end": null} ] 
            }
    },

    {$match: 
            { $and: 
                [ { "affiliations.name": { $ne: "Liberal"}}, { "affiliations.end": {$ne: null}} ] 
            }
    }
])
.toArray());