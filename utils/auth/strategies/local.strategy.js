const { Strategy } = require("passport-local");
const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");

const UsersService = require("../../../services/users.service");
const service = new UsersService();

const LocalStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async (email, password, done) => {
    const notAuthorized = () =>
      done(boom.unauthorized("Email and password don not match"), false);
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        notAuthorized();
      } else {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          notAuthorized();
        } else {
          delete user.password;
          return done(null, user);
        }
      }
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
