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
const adminEmailManager=require("../controllers/admin/admin-emailManager.controller");
const adminEventManager=require("../controllers/admin/admin-eventManager.controller");

//member
const memberDash=require("../controllers/members/member-dashboard.controller");
const timetableCont=require("../controllers/members/timetable.controller");


//-------------------------------------------------------------------------------//
//                               GENERAL ROUTING                                 //
//-------------------------------------------------------------------------------//
 Router.get("/signin",signinCont.render_signin);
 Router.post("/signin",signinCont.signin);

 Router.get("/member-registration",memberRegistration.render_memberRegistration);
 Router.post("/member-registration",memberRegistration.registerMember);

 Router.get("/blog",blog.render_blog);
 Router.get("/posts/:var",blog.render_blogPost);
 Router.post("/add-comment",blog.post_comment);
 Router.get("/blog-manager",blog.render_blogManager);
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

Router.post("/edit-member",adminMemberCrud.post_editMember);
Router.get("/edit-member",adminDash.isAuth,adminMemberCrud.editMember);

Router.post("/update-member",adminMemberCrud.updateMember);

Router.post("/delete-member",adminMemberCrud.post_deleteMember);
Router.get("/delete-member",adminMemberCrud.deleteMember);


Router.get("/search-members",adminMemberCrud.render_searchMember);
Router.get("/search-member",adminMemberCrud.searchMember);
Router.post("/search-member",adminMemberCrud.post_searchMember);






//               ADMIN EMAIL MANAGER
Router.get("/email-manager",adminDash.isAuth,adminDash.render_emailManager);
Router.get("/email-teacher",adminEmailManager.emailTeacher);


Router.get("/send-mail-to-teacher",adminEmailManager.render_sendMailToTeacher);
Router.post("/mailinfo",adminEmailManager.post_getMailInfo);

Router.get("/send-mail-to-anyone",adminEmailManager.render_sendMailToAnyone);

Router.post("/sendmail",adminEmailManager.post_sendmail);

Router.post("/generate-report",adminDash.post_genReport);
Router.get("/generate-report",adminDash.genReport);

//------------------------------------------------------------------------//
//                                EVENT MANAGER                           //
//------------------------------------------------------------------------//
Router.get("/event-manager",adminEventManager.render_eventManager);
Router.get("/add-event",adminEventManager.addEvent);
Router.post("/add-event",adminEventManager.post_addEvent);

Router.get("/event-crud",adminEventManager.render_eventCrud);
Router.post("/delete-event",adminEventManager.deleteEvent);


Router.post("/edit-event",adminEventManager.editEvent);
Router.get("/edit-event",adminEventManager.render_editEvent);
Router.post("/update-event",adminEventManager.updateEvent);

module.exports=Router;


//------------------------------------------------------------------------//
//                                TIMETABLE MANAGER                       //
//------------------------------------------------------------------------//

Router.get("/register-timetable/:day",timetableCont.render_registerTimetable);
Router.post("/register-timetable",timetableCont.post_registerTimetable);

Router.get("/timetable-manager",timetableCont.render_timetableManager);

Router.get("/update-timetable",timetableCont.render_updateTimetable);
Router.post("/update-timetable",timetableCont.updateTimetable);

Router.get("/view-timetable/:day",timetableCont.render_timetable);

//--------------------------------------------------------------------------//
//                               USER INFO                                  //
//--------------------------------------------------------------------------//
Router.get("/user-info",memberDash.render_userInfo);
