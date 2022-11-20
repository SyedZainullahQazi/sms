const express=require("express");
const Router=express.Router();
const signinCont=require("../controllers/signin.controller");
const memberRegistration=require("../controllers/member-registration.controller");


 Router.get("/",signinCont.signin);


 Router.get("/member-registration",memberRegistration.render_memberRegistration);
 Router.post("/member-registration",memberRegistration.registerMember);


module.exports=Router;