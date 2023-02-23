const express = require("express");
const passport = require("passport");
const validatorHandler = require("../middlewares/validator.handler");
const { updateUserSchema, getUserSchema } = require("../schemas/user.schema");

const router = express.Router();

const UsersService = require("../services/users.service");
const service = new UsersService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const users = await service.find();

    const usersWithoutPsswd = users.map((user) => {
      delete user.password;
      return user;
    });

    res.json(usersWithoutPsswd);
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { message, data } = await service.findOne(id);

      res.status(200).json({
        message,
        data
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const updatedUser = await service.update(params.id, body);

      res.json({
        message: "updated",
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
