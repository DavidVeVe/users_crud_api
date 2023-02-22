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
  this.collection = USERS_COLLECTION;
  this.findByEmail = findByEmail;

  async function find() {
    const users = await this.mongo.getAll(this.collection);
    return users;
  }

  async function findOne(id) {
    const foundUser = await this.mongo.getOne(this.collection, id);
    if (!foundUser) {
      throw boom.notFound("User not found");
    }

    return {
      message: "retrieved successfully",
      data: foundUser
    };
  }

  async function findByEmail(email) {
    const foundUser = await this.mongo.getOneByEmail(this.collection, email);
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
      throw boom.notFound("User not found");
    }

    return updatedUserId;
  }
}

module.exports = UsersService;
