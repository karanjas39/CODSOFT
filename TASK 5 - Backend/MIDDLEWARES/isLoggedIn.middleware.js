const jwt = require("jsonwebtoken");

module.exports = { isUserLoggedIn };

async function isUserLoggedIn(req, res, next) {
  try {
    let token =
      req.headers.authorization.replace("Bearer ", "") || req.cookies.token;

    if (!token || null) {
      return res.send({
        success: false,
        status: 419,
        message: "Authentication token is required.",
      });
    }

    let decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      return res.send({
        success: false,
        status: 419,
        message:
          "Unauthorized access. You do not have the necessary permissions.",
      });
    }

    req.id = decoded._id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.send({
      success: false,
      status: 419,
      message:
        "Unauthorized access. You do not have the necessary permissions.",
    });
  }
}
