const jwt = require("jsonwebtoken");

module.exports = { isUserLoggedIn };

async function isUserLoggedIn(req, res, next) {
  try {
    console.log(req.cookies.token);
    let token =
      req.cookies.token || req.headers.authorization.replace("Bearer ", "");

    if (!token || null) {
      return res.send({
        success: false,
        status: 419,
        message: "Authentication token is required.",
      });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.send({
        success: false,
        status: 419,
        message:
          "Unauthorized access. You do not have the necessary permissions.",
      });
    }
    req.id = decoded._id;
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
