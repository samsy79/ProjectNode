var { MongoClient } = require("mongodb");
var { getClient , getMongoClient} = require("../database/index");

getMongoClient()
const DB = {
   collection(params) {
    const db = getClient().db('benindb')
    const collection = db.collection(params);
    return collection;
  },
};
module.exports = DB ;
