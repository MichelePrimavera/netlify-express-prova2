const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db ;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://nicola-turi:NicolaTuriCms2020@cluster0.ewdvt.mongodb.net/nicola-turi-cms?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then((client) => {
      _db = client.db();
      callback(client);
    })
    .catch((err) => console.log('err', err));
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
