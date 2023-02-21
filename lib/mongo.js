const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const config = require("../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    });
    this.dbName = DB_NAME;
  }

  async connect() {
    await this.client.connect();
    const DB = this.client.db(this.dbName);
    return DB;
  }

  async getAll(collection) {
    const db = await this.connect();
    return db.collection(collection).find().toArray();
  }

  async create(collecton, data) {
    const db = await this.connect();
    const newInsertion = await db.collection(collecton).insertOne(data);
    return newInsertion.insertedId;
  }

  async update(){

  }
}

module.exports = MongoLib;
