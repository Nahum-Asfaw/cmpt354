// Want to do this per province...
printjson(
db.people.aggregate([
{$match: {
    "roles.temporal_status": "current"
}},
{$project: {
    province: {$last: "$roles.province"}, 
    Male: {$cond: [{$eq: ["$gender", "man"]}, 1, 0]},
    Female: {$cond: [{$eq: ["$gender", "woman"]}, 1, 0]},
}},
{$group: {
    _id: "$province",
    M: {$sum: "$Male"},
    F: {$sum: "$Female"}
}},
{$project: {
    _id: 0, 
    province: "$_id",
    M: 1,
    F: 1}},
{$sort: {province: 1}}
])
.toArray());