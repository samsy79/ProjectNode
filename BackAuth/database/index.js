var {MongoClient}=require("mongodb");
const url ="mongodb://localhost:27017/benindb";
let client;
async function getMongoClient(){
    if(client){
        console.log("client is here");
        return client;
    }
    try {
      client = new MongoClient(url);
       await  client.connect();
       console.log('all are here ');
       return client;
    } catch (error) {
        console.log(error);
    }
}
function getClient(){
    if (client)
    return client
}

module.exports = {getMongoClient,getClient}