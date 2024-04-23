const User = require("../MODELS/User.model");
const Bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const SendOTP = require("../UTILS/sendOTP");

module.exports = {
  createUser,
  loginUser,
  getUser,
  verifyOTP,
  sendOTPToVerifyEmail,
};

async function createUser(req, res) {
  try {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role || !password) {
      return res.send({
        success: false,
        status: 404,
        message: "All fileds are mandatory.",
      });
    }

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );

    if (!isEmail) {
      return res.send({
        success: false,
        status: 400,
        message: "Enter valid email.",
      });
    }

    if (!["taker", "creator"].includes(role)) {
      return res.send({
        success: false,
        status: 400,
        message: "You have not selected a valid role.",
      });
    }

    const isPasswordLength = password.length <= 8 && password.length >= 6;

    if (!isPasswordLength) {
      return res.send({
        success: false,
        status: 400,
        message:
          "The password should be of greater than 6 and less than 8 characters.",
      });
    }

    const saltedPassword = Bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      role,
      password: saltedPassword,
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        success: false,
        status: 404,
        message: "All fileds are mandatory.",
      });
    }

    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );

    if (!isEmail) {
      return res.send({
        success: false,
        status: 400,
        message: "Enter valid email.",
      });
    }

    const isUser = await User.findOne({ email }).select("+password");

    if (!isUser) {
      return res.send({
        success: false,
        status: 404,
        message: "Credentials are not correct.",
      });
    }

    const isPassword = Bcrypt.compareSync(password, isUser.password);

    if (!isPassword) {
      return res.send({
        success: false,
        status: 404,
        message: "Credentials are not correct.",
      });
    }

    const token = JWT.sign({ _id: isUser._id }, process.env.JWT_TOKEN);

    res.send({
      success: true,
      status: 200,
      message: "Hey! you are successfully loggedIn.",
      token,
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
    const { id, role } = req;

    const isUser = await User.findById(id).select("-_id");

    if (!isUser) {
      return res.send({
        success: false,
        status: 404,
        message: "Authentication token is required.",
      });
    }

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

async function sendOTPToVerifyEmail(req, res) {
  try {
    const { id } = req;

    const isUser = await User.findById(id);

    if (!isUser) {
      return res.send({
        success: false,
        status: 400,
        message: "Authentication token is required.",
      });
    }

    if (isUser.verified == true) {
      return res.send({
        success: false,
        status: 400,
        message: "User is already verified successfully.",
      });
    }

    const { otp, isEmailSend } = await SendOTP({
      name: isUser.name,
      email: isUser.email,
    });

    if (isEmailSend.success == false) {
      return res.send({
        success: false,
        status: 400,
        message: "Email is not sent successfully.",
      });
    }

    isUser.otp = otp;
    isUser.otpCreatedAt = Date.now();

    await isUser.save();

    res.send({
      success: true,
      status: 200,
      message: "OTP has been sent successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function verifyOTP(req, res) {
  try {
    const { id } = req;
    const { otp } = req.body;

    if (!otp) {
      return res.send({
        success: false,
        status: 200,
        message: "OTP is required.",
      });
    }

    const isUser = await User.findById(id);

    if (!isUser) {
      return res.send({
        success: false,
        status: 404,
        message: "Authentication token is required.",
      });
    }

    if (otp != isUser.otp) {
      return res.send({
        success: false,
        status: 400,
        message: "OTP is not correct.",
      });
    }

    const otpExpirationTime = new Date(
      isUser.otpCreatedAt.getTime() + 1 * 60 * 1000
    );

    const currentTime = new Date();

    if (otpExpirationTime < currentTime) {
      return res.send({
        success: false,
        status: 400,
        message: "OTP has expired.",
      });
    }

    await User.findByIdAndUpdate(id, { otp: "", verified: true });

    res.send({
      success: true,
      status: 200,
      message: "User is verified successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}
