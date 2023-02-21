const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();

const UsersService = require('../services/users.service');
const service = new UsersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { message, statusCode, data } = await service.findOne(id);

      res.status(statusCode).json({
        message,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const data = await service.create(req.body);

    res.status(201).json({
      message: 'created',
      data,
    });
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const updatedUser = await service.update(params.id, body);

      res.json({
        message: 'updated',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await service.deleteUser(id);
  res.json({
    message: 'deleted',
    data: deletedUser,
  });
});

module.exports = router;
