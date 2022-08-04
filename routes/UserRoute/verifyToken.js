const JWT = require("jsonwebtoken");

// Just simply verify the token, user has a token or not, valid or not valid
const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied!");
  try {
    const verified = JWT.verify(token, process.env.JWT_SEC);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send("invalid token");
  }
};

// Verify the token and verify the user as well that the logged in user is authenticated or not
const verifyTokenAndAuthorization = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that.");
    }
  });
};

module.exports = {
  verifyTokenAndAuthorization,
  verifyToken,
};
