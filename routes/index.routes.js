const express=require("express");
const Router=express.Router();
const signinCont=require("../controllers/signin.controller");
const memberRegistration=require("../controllers/member-registration.controller");
const mentorDash=require("../controllers/mentor-dashboard.controller");
const memberDash=require("../controllers/member-dashboard.controller");

 Router.get("/signin",signinCont.render_signin);
 Router.post("/signin",signinCont.signin);


 Router.get("/member-registration",memberRegistration.render_memberRegistration);
 Router.post("/member-registration",memberRegistration.registerMember);

 Router.get("/mentor-dashboard",mentorDash.isAuth,mentorDash.render_mentorDash);

 Router.get("/member-dashboard",memberDash.isAuth,memberDash.render_memberDash);

module.exports=Router;
