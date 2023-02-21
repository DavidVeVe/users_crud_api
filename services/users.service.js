const boom = require('@hapi/boom')
const mockData = [
  {
    id: 0,
    name: 'David',
    age: 30,
    hobbies: ['playing the guitar, swimming, playing soccer'],
    isBlocked: false,
  },
  {
    id: 1,
    name: 'Renata',
    age: 1,
    hobbies: [
      'watching tv, playing with my feet, try to put everything in my mouth',
    ],
    isBlocked: false,
  },
  {
    id: 2,
    name: 'Camila',
    age: 20,
    hobbies: ['watching movies, wearing different makups, playing cards'],
    isBlocked: false
  },
  {
    id: 3,
    name: 'Rumildo',
    age: 25,
    hobbies: [],
    isBlocked: true
  },
];

function UsersService() {
  this.users = mockData;
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
    if(!user) {
      throw boom.notFound('Product not found')
    }
    if(user.isBlocked) {
      throw boom.conflict('User is blocked')
    }

    return {
      message: 'retrieved successfully',
      statusCode: 200,
      data: user,
    };
  }

  async function create(data) {
    this.users.push(data);
    return this.users;
  }

  async function update(id, data) {
    const userIndex = this.users.findIndex((user) => user.id === +id);
    if (userIndex === -1) {
      throw boom.notFound('Product not found')
    }

    const newData = { ...this.users[userIndex], ...data };
    this.users[userIndex] = newData;
    return newData;
  }

  async function deleteUser(id) {
    const userIndex = this.users.findIndex((user) => user.id === +id);
    if (userIndex === -1) {
      throw boom.notFound('Product not found')
    }

    return this.users.splice(userIndex, 1);
  }
}

module.exports = UsersService;