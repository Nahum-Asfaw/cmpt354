// currently liberal -> end : null and name: liberal
// previously diff affiliation: end != null and name != liberal
printjson(
db.people.find(
{$and: [
    {affiliations: {$elemMatch:{name: "Liberal", temporal_status: "current"}}}, 
    {affiliations: {$elemMatch:{name: {$ne: "Liberal"}, temporal_status: "ended"} }}
    ]
},
{_id: false, name: true}).sort({name:1})
//
.toArray());