printjson(
db.committees.aggregate([
{ $unwind: "$subcommittees" },
{ $replaceRoot: { newRoot: {
name: "$subcommittees.name",
 members: "$subcommittees.members",
parent_committee: { id: "$_id",
 name: "$official_name" }
} } },
{$match: {
    name: "Subcommittee on Human Resources",
    }
},
{$project: {members: 1}},
{$unwind: "$members"},
{$replaceRoot: { newRoot: {
    role: "$members.role",
    id: "$members.id"}}},
{$match: {
    role: "deputy_chair"}},
{$project: {
    id: 1}},
{$lookup: {
    from: "people",
    localField: "id",
    foreignField: "_id",
    as: "curr"}},
{$project: {
    id: 0}},
{$unwind: "$curr"},
{$replaceRoot: {newRoot: "$curr"}}
])
.toArray());