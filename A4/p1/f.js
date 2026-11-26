printjson(
db.people.aggregate([
{$match: {"roles.province": "British Columbia", "roles.temporal_status": "current"}},
  {$lookup: {
    from: "committees",
    let: {personId: "$_id"},
    pipeline: [
      {$unwind: "$members"},
      {$match: {$expr: {$and: [
        {$eq: ["$members.id", "$$personId"]},
        {$eq: ["$members.temporal_status", "current"]}
      ]}}},
      {$limit: 1}
    ],
    as: "Seats"
  }},
// so far have serving bc legislators joined with the committees they are in
{$match: {"Seats": []}}, // those who have no seats in committees
{$project: {name: 1, _id: 0}},
{$sort: {name: 1}}
])
.toArray());