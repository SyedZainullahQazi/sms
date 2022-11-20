const express=require("express");
const Router=express.Router();
const signinCont=require("../controllers/signin.controller");



 Router.get("/",signinCont.signin);
 Router.get("/member-registration",signinCont.memberRegistration);

module.exports=Router;