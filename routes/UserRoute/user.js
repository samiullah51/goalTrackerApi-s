const User = require("./.././../models/User");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
// Send Email
const sendEmail = (receiverName, receiverEmail, recieverOtp) => {
  // Step 1
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, // TODO: your gmail account
      pass: process.env.PASS, // TODO: your gmail password
    },
  });
  // Step 2
  let mailOptions = {
    from: "mernstack51729@gmail.com", //  email sender
    to: receiverEmail, // email receiver
    subject: "GoalTracker Confirmation",
    html: `Dear ${receiverName}, your OTP is:  <h2>${recieverOtp}</h2>`,
  };
  //  Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent successfully");
  });
};

// Register a new User

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // Check if user already exist
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(409).json("User is already exist");
    return;
  } else {
    let encryptPassword =
      password &&
      CryptoJS.AES.encrypt(password, process.env.CRYPTO_SEC).toString();
    try {
      const newUser = new User({
        username,
        email,
        password: encryptPassword,
        otpCode: Math.floor(1000 + Math.floor(Math.random() * 9000)),
      });
      const savedUser = await newUser.save();
      // Send Verification Email
      res.status(200).json(savedUser);
      savedUser &&
        sendEmail(savedUser.username, savedUser.email, savedUser.otpCode);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
});

// Before login a registered user, make sure to verify the OTP sent to his Email

router.post("/verify", async (req, res) => {
  const { email, otpCode } = req.body;

  try {
    const checkUserWithOtp = await User.findOne({ email, otpCode });
    if (checkUserWithOtp.otpCode === otpCode) {
      const verifiedUser = await checkUserWithOtp.update({
        $set: {
          verified: true,
        },
      });
      res.status(201).json({ message: "Verified Successfully", verifiedUser });
    } else {
      res.status(300).json({ message: "user is not verified" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login a registered User

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // Check if user exist or not
    if (!user) {
      res.status(401).json("User not found");
      return false;
    } else {
      // Decrypt the password which is stored in Encryption form in database
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_SEC
      );
      const realPassword = await hashedPassword.toString(CryptoJS.enc.Utf8);
      if (realPassword !== req.body.password) {
        res.status(401).json("Invalid Credentials");
        return false;
      } else {
        // Create Token
        const token = JWT.sign(
          {
            id: user._id,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        const { password, otpCode, __v, ...others } = user._doc;
        res.header("auth-token", token).send({ ...others, token });
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Forgotten password
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: req.body.email });

    // Check if the user exist with the same email or not
    if (user.email === email) {
      // Fresh OTP
      freshOtp = Math.floor(1000 + Math.floor(Math.random() * 9000));
      await User.updateOne({
        email,
        $set: {
          otpCode: freshOtp,
        },
      });
      // await sendEmail(checkUser.username, checkUser.email, 1234);
      res.status(200).json(freshOtp + " OTP Updated Successfully");
    } else {
      res.status(400).json({ message: "Email not exitst" });
    }
  } catch (err) {
    res.status(500).json({ message: "Email not exist" });
  }
});

// New Password
router.post("/forgotpassword/newpassword", async (req, res) => {
  const { email, newpassword } = req.body;

  try {
    await User.updateOne({
      email,
      $set: {
        password: CryptoJS.AES.encrypt(
          newpassword,
          process.env.CRYPTO_SEC
        ).toString(),
      },
    });

    res.status(201).json({ message: "Passwored changed successfulyy" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// export router
module.exports = router;
