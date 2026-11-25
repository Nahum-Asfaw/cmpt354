printjson(
db.committees.aggregate([
{$match: {
    code: "CIBA"
}},
{$unwind: "$subcommittees"},
{$project: {_id: false, subcommitees: true}},
{$match: {
    name: "Subcommittee on Human Resources"
}}
])   
.toArray());