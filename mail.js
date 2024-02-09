const nodemailer = require("nodemailer");
require("dotenv").config()

const otpGenerator = require('otp-generator')

const otpGenerate=()=>{
    const OTP=otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         lowerCaseAlphabets:false,
        specialChars: false,
    });
    return OTP
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'nodemailertestmail4@gmail.com',
    pass: 'fnlm fywq zwro elpp',
  },
});

const otp = otpGenerate()

const mailOption = {
  from: {
    name: 'Rt-max',
    address: "nodemailertestmail4@gmail.com",
  },
  to: "rifahadmt202@gmail.com",
  subject: "OTP from Rt-max Application",
  text: `Your OTP is ${otp}`,
};
const sendMail = async (transporter, mailOption) => {
  try {
    await transporter.sendMail(mailOption);
    console.log("Mail has been sent successfully");
  } catch (error) {
    console.log(`Error occurred while sending email: ${error}`);
  }
};

sendMail(transporter, mailOption);