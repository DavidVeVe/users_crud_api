const { MongoClient, ObjectId } = require("mongodb");
const config = require("../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(
      MONGO_URI,
      { useUnifiedTopology: true },
      { useNewUrlParser: true }
    );
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if (error) {
          reject(error);
        }
        console.log("Connected to mongoDB");
        resolve(this.client.db(this.dbName));
      });
    });
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  create(collecton, data) {
    return this.connect()
      .then(db => {
        return db.collection(collecton).insertOne(data);
      })
      .then(result => result.insertedId);
  }
}

module.exports = MongoLib;