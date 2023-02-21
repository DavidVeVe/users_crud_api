// const { MongoClient, ServerApiVersion } = require('mongodb');
const boom = require("@hapi/boom");
const MongoLib = require("../lib/mongo");

const USERS_COLLECTION = 'users';

function UsersService() {
  this.mongo = new MongoLib();
  this.create = create;
  this.find = find;
  this.findOne = findOne;
  this.update = update;
  this.deleteUser = deleteUser;
  this.collection = USERS_COLLECTION

  async function find() {
    try {
        const users = await this.mongo.getAll(this.collection)
        return users;
    } catch (error) {
        return error
    }
  }

//   async function findOne(id) {
//     const user = this.users.find((user) => user.id === +id);
//     if (!user) {
//       throw boom.notFound("Product not found");
//     }

//     return {
//       message: "retrieved successfully",
//       statusCode: 200,
//       data: user
//     };
//   }

  async function create(newUserData) {
    try {
      const newUserId = await this.mongo.create(this.collection, newUserData)
      console.log(newUserId)
      return newUserId;
    } catch (error) {
        return error
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
