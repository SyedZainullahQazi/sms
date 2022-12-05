const express=require("express");
const Router=express.Router();
//general
const signinCont=require("../controllers/signin.controller");
const memberRegistration=require("../controllers/member-registration.controller");
const blog=require("../controllers/general/blog.controller");

//admin
const adminDash=require("../controllers/admin/admin-dashboard.controller");
const adminAddMember=require("../controllers/admin/admin-addMember.controller");
const adminMemberCrud=require("../controllers/admin/admin-memberCrud.controller");
//member
const memberDash=require("../controllers/members/member-dashboard.controller");


//-------------------------------------------------------------------------------//
//                               GENERAL ROUTING                                 //
//-------------------------------------------------------------------------------//
 Router.get("/signin",signinCont.render_signin);
 Router.post("/signin",signinCont.signin);

 Router.get("/member-registration",memberRegistration.render_memberRegistration);
 Router.post("/member-registration",memberRegistration.registerMember);

 Router.get("/blog",blog.render_blog);
 Router.get("/posts/:var",blog.render_blogPost);
 //-----------------------------------------------------------------------------//
 //                          MEMBER ROUTES                                      //
 //----------------------------------------------------------------------------//
 Router.get("/member-dashboard",memberDash.isAuth,memberDash.render_memberDash);

//-----------------------------------------------------------------------------//
//                              ADMIN ROUTES                                   //
//-----------------------------------------------------------------------------//
 
//                 ADMIN DASHBOARD                    // 
 Router.get("/admin-dashboard",adminDash.isAuth,adminDash.render_adminDash);

//                 ADMIN COMPOSE BLOGPOST             //
 Router.get("/compose-blog-post",adminDash.isAuth,adminDash.render_composeBlogPost);
 Router.post("/compose-blog-post",adminDash.getBlogPost);

//                 ADMIN MANAGE MEMBERS               //
Router.get("/manage-members",adminDash.isAuth,adminDash.render_manageMembers);

//                 ADMIN ADD MEMBERS                  //
Router.get("/add-member",adminDash.isAuth,adminAddMember.render_addMember);
Router.post("/add-member",adminAddMember.admin_registerMember);

//                 ADMIN CRUD SCREEN
Router.get("/view-members",adminMemberCrud.render_memberCrud);

Router.get("/view-members/:var",adminMemberCrud.render_team);
Router.post("/view-members/:var",adminMemberCrud.redirect_team);

module.exports=Router;
