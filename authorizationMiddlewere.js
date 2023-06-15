const User = require("./userModel");

const authorizationMiddleware = async (req, res, next) => {
  const [login, password] = req.headers.authorization.split(":");
  const user = await User.findOne({
    login: login,
    password: password,
  });

  if (user) {
    req.user = user;
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = authorizationMiddleware;