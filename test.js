// const nodemailer = require("nodemailer");
// const dotevn = require("dotenv");
// const log = console.log;
// dotevn.config();
// // Step 1
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.USER, // TODO: your gmail account
//     pass: process.env.PASS, // TODO: your gmail password
//   },
// });

// // Step 2
// let mailOptions = {
//   from: "mernstack51728@gmail.com", // TODO: email sender
//   to: "samii51728@gmail.com", // TODO: email receiver
//   subject: "last try to confirm",
//   text: "it takes a lot time but finally i won:)",
// };

// // Step 3
// transporter.sendMail(mailOptions, (err, data) => {
//   if (err) {
//     return log(err);
//   }
//   return log(data);
// });
