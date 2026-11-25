//
printjson(
db.people.aggregate(
{$match: // select currently serving conservative women
    {affiliations: {$elemMatch:{name: {$in: ["Conservative", "Conservative Party of Canada"]}, temporal_status: "current"}}}
},
{$match:
{gender: "woman", birth_year: {$ne: null}}
},
{$project:
{_id: 0, name: 1, province: {$first: "$roles.province"}, type: {$first: "$roles.type"}, 
age: {$subtract: [2026, "$birth_year"]}}
},
{$sort: {
    age:-1,
    name:1
}}
)
.toArray());