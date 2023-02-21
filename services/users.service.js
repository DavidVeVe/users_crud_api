// const { MongoClient, ServerApiVersion } = require('mongodb');
const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const MongoLib = require("../lib/mongo");

const USERS_COLLECTION = "users";

function UsersService() {
  this.mongo = new MongoLib();
  this.create = create;
  this.find = find;
  this.findOne = findOne;
  this.update = update;
  //   this.deleteUser = deleteUser;
  this.collection = USERS_COLLECTION;
  this.findByEmail = findByEmail;

  async function find() {
    const users = await this.mongo.getAll(this.collection);
    return users;
  }

  async function findOne(id) {
    const foundUser = await this.mongo.getOne(this.collection, id);
    if (!foundUser) {
      throw boom.notFound("Product not found");
    }

    return {
      message: "retrieved successfully",
      data: foundUser
    };
  }

  async function findByEmail(email) {
    const foundUser = await this.mongo.getOneByEmail(this.collection, email);
    if (!foundUser) {
      throw boom.notFound("Email or password do not match ");
    }

    return foundUser;
  }

  async function create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUserId = await this.mongo.create(this.collection, {
      ...data,
      password: hash
    });
    return newUserId;
  }

  async function update(id, data) {
    const updatedUserId = await this.mongo.update(this.collection, id, data);
    if (!updatedUserId) {
      throw boom.notFound("Product not found");
    }

    return updatedUserId;
  }

  //   async function deleteUser(id) {
  //     const userIndex = this.users.findIndex((user) => user.id === +id);
  //     if (userIndex === -1) {
  //       throw boom.notFound("Product not found");
  //     }

  //     return this.users.splice(userIndex, 1);
  //   }
}

module.exports = UsersService;
