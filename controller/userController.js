const UserModel = require("../model/registerModel");
require("dotenv").config();
const bcrypt=require("bcrypt")



module.exports = {
  signup: (req, res) => {
    res.render("registerNewAccount");
  },
  signupPost: async (req, res) => {
    console.log(req.body);
    const userStore = await UserModel.create(req.body);
    const { phoneNumber } = req.body;
    req.session.phone = phoneNumber;
    
    res.redirect("/email");
  },

  emailVerify: (req, res) => {
    res.render("emailVerify");
  },  
  emailVerifyPost: async (req, res) => {
    let { email } = req.body;
    let phone = req.session.phone;
    console.log("Phone Number from Session:", phone);

    const emailUpdate = await UserModel.findOneAndUpdate(
      { phoneNumber: phone },
      { $set: { email: email } },
      { new: true }
      );
    res.redirect("/otp");
  },

  otp: (req, res) => {
    res.render("verifyOtp");
  },

  otpPost: async (req, res) => {
    const{otp}=req.body
    const{generatedOtp}=require("../utility/nodemailer")

    if (otp === generatedOtp) {
      let phone = req.session.phone;
      const roleUpdate = await UserModel.findOneAndUpdate(
        { phoneNumber: phone },
        { $set: { otp: true } },
        { new: true }
        );
      res.redirect("/"); 
    }else{
      res.redirect("/otp")
    }
    // console.log(otp, generatedOtp)
  },

  forgotPassword: (req, res) => {
    res.render("forgotPassword");
  },

  forgotPasswordPost: (req, res) => {

  },

  login: (req, res) => {
    res.render("userLogin");
  },
  loginPost: async (req, res) => {
    try{
      const {email,password}=req.body
      console.log(email, password);
      req.session.email=email;
      const account=await UserModel.findOne({email})
      const passwordcheck = await bcrypt.compare(password,account.password)
      if(!account){
        req.flash("account doesn't exist");
      }else if(account.email === email && passwordcheck && account.otp == true){
        res.redirect("/home"); 
      }else{
        res.redirect("/")
      }
    }catch(error){
      
    }
      

  },
  home:(req, res) => {
    res.render("userHomePage")
  },  
  account: (req, res) => {

  },
  category: (req, res) => {

  },
  detailedProduct: (req, res) => {

  },

  profile: (req, res) => {

  },
  profileEdit: (req, res) => {

  },
  wishlist: (req, res) => {

  },
  wishlistEdit: (req, res) => {

  },
  cart: (req, res) => {

  },
  cartPost: (req, res) => {

  },
  cartEdit: (req, res) => {

  },
  addToCart: (req, res) => {

  },
  removeFromCart: (req, res) => {

  },
  placeOrder: (req, res) => {

  },
  myOrder: (req, res) => {

  },
  shippingAddress: (req, res) => {

  },
  shippingAddressPost: (req, res) => {

  },
  orderDetails: (req, res) => {

  },
  search: (req, res) => {

  },
  logout: (req, res) => {
    req.session.destroy();
  },
};
