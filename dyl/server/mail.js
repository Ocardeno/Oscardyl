const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

// Create express app
const app = express();

var transport = {
  host: "smtp.gmail.com", // e.g.  //smtp.mail.yahoo.com
  //service:"Gmail",
  auth: {
    user: "fcardeno22@gmail.com",
    pass: "All4_one%",
  },
  tls: {
    rejectUnauthorized: false,
  },
};

var transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
  if (error) {
    console.log("-----------" + error);
  } else {
    console.log("All works fine, congratz!");
  }
});

const router = express.Router();
router.post("/sendMail", (req, res, next) => {
  const name = req.body.name + " " + req.body.lastname;
  const email = req.body.email;
  const message = req.body.message;

  var mail = {
    from: name,
    to: email,
    subject: "Contact form request",

    html: message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("Error sending:" + res);
      res.json({
        msg: "fail",
      });
    } else {
      console.log("Sent to:" + req.body.email);
      res.json({
        msg: "success",
      });
    }
  });
  transporter.close();
});

// Export router
module.exports = router;
