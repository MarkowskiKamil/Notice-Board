const User = require("./userModel");

const authorizationMiddleware = async (req, res, next) => {
  const [username, password] = req.headers.authorization.split(":");
  const user = await User.findOne({
    username: username,
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