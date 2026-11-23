printjson(
db.people.aggregate(
  [
    {$match: { $and: [ { birth_date: {$gt: "1989-04-24"} }, { birth_date: {$lt: "1996-07-08"} } ] 
             }
    },
    {$project: { _id: 0, birth_date: 1, name: 1}
    }
  ]
).toArray());