const express = require("express");
const boom = require("@hapi/boom");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { createUserSchema, logInSchema } = require("../schemas/user.schema");
const validatorHandler = require("../middlewares/validator.handler");
const UsersService = require("../services/users.service");

const config = require("../config/config");
const service = new UsersService();

const router = express.Router();

router.post(
  "/login",
  validatorHandler(logInSchema, "body"),
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      console.log(user);
      const payload = {
        sub: user.id,
        role: user.role
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/signup",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const isNewUser = await service.findByEmail(email);

      if (!isNewUser) {
        const createdUserId = await service.create(req.body);

        const payload = {
          sub: createdUserId
        };
        const token = jwt.sign(payload, config.jwtSecret);

        res.status(201).json({
          createdUserId,
          token
        });
      } else {
        next(boom.conflict("Email already in use"));
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
