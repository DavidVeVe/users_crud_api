const { MongoClient, ServerApiVersion } = require("mongodb");
const boom = require("@hapi/boom");
const uri =
  "mongodb+srv://DavidVelazquez1:xc7f6Ah13IyE@zerocopylabs.n3meosi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

const DB_NAME = "zero_copy_users";
const USERS_COLLECTION = "users";

// const mockData = [
//   {
//     id: 0,
//     name: 'David',
//     age: 30,
//     hobbies: ['playing the guitar, swimming, playing soccer'],
//     isBlocked: false,
//   },
//   {
//     id: 1,
//     name: 'Renata',
//     age: 1,
//     hobbies: [
//       'watching tv, playing with my feet, try to put everything in my mouth',
//     ],
//     isBlocked: false,
//   },
//   {
//     id: 2,
//     name: 'Camila',
//     age: 20,
//     hobbies: ['watching movies, wearing different makups, playing cards'],
//     isBlocked: false
//   },
//   {
//     id: 3,
//     name: 'Rumildo',
//     age: 25,
//     hobbies: [],
//     isBlocked: true
//   },
// ];

function UsersService() {
  this.users = [];
  this.create = create;
  this.find = find;
  this.findOne = findOne;
  this.update = update;
  this.deleteUser = deleteUser;

  async function find() {
    return this.users;
  }

  async function findOne(id) {
    const user = this.users.find((user) => user.id === +id);
    if (!user) {
      throw boom.notFound("Product not found");
    }

    return {
      message: "retrieved successfully",
      statusCode: 200,
      data: user
    };
  }

  async function create(newUser) {
    try {
      await client.connect();
      const result = await client
        .db(DB_NAME)
        .collection(USERS_COLLECTION)
        .insertOne(newUser);

      return result.insertedId;
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  }

  async function update(id, data) {
    const userIndex = this.users.findIndex((user) => user.id === +id);
    if (userIndex === -1) {
      throw boom.notFound("Product not found");
    }

    const newData = { ...this.users[userIndex], ...data };
    this.users[userIndex] = newData;
    return newData;
  }

  async function deleteUser(id) {
    const userIndex = this.users.findIndex((user) => user.id === +id);
    if (userIndex === -1) {
      throw boom.notFound("Product not found");
    }

    return this.users.splice(userIndex, 1);
  }
}

module.exports = UsersService;
