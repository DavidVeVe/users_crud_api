const { Strategy } = require("passport-local");
const boom = require("@hapi/boom");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const UsersService = require("../services/users.service");
const service = new UsersService();

const LocalStrategy = new Strategy(async (email, password, done) => {
  console.log(email);
  console.log(password);
  const notAuthorized = () => done(boom.unauthorized(), false);
  try {
    const user = await service.findByEmail(email);
    console.log(user)
    if (!user) {
      notAuthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      notAuthorized();
    } else {
      return done(null, user);
    }
  } catch (error) {
    done(error, false);
  }
});

passport.use(LocalStrategy);
