const User = require("../Modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = { createUser, loginUser, getUser };

async function createUser(req, res) {
  try {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username) {
      return res.send({
        success: false,
        status: 404,
        message: "All fields are mandatory.",
      });
    }

    const sanitizedEmail = email.toLowerCase();

    const isUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: sanitizedEmail }],
    });

    if (isUser) {
      return res.send({
        success: false,
        status: 400,
        message:
          email.toLowerCase() == isUser.email
            ? "User with this email already exist."
            : "User with this username already exist.",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email: sanitizedEmail,
      password: hashedPassword,
      username,
    });

    if (!newUser) {
      return res.send({
        success: false,
        status: 400,
        message: "User is not created successfully.",
      });
    }

    res.send({
      success: true,
      status: 200,
      message: "User is created successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!(username || email) || !password) {
      return res.send({
        success: false,
        status: 404,
        message: "All fields are mandatory.",
      });
    }

    const sanitizedEmail = !!email ? email.toLowerCase() : "";

    const isUser = await User.findOne({
      $or: [{ email: sanitizedEmail }, { username }],
    }).select("+password");

    if (!isUser) {
      return res.send({
        success: false,
        status: 400,
        message: "Credentials are not correct.",
      });
    }

    const isPassword = bcrypt.compareSync(password, isUser.password);

    if (!isPassword) {
      return res.send({
        success: false,
        status: 400,
        message: "Credentials are not correct.",
      });
    }

    const token = jwt.sign({ _id: isUser._id }, process.env.JWT_SECRET_KEY);

    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      })
      .json({
        success: true,
        status: 200,
        token: token,
        message: `Hi! ${
          isUser.name.split(" ")[0]
        }, you are sucessfully logged in.`,
      });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req;

    const isUser = await User.findById(id);

    res.send({
      success: true,
      status: 200,
      user: isUser,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}
