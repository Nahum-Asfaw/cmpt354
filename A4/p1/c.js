// currently liberal -> end : null and name: liberal
// previously diff affiliation: end != null and name != liberal
printjson(
db.aggregate.people()
//
.toArray());