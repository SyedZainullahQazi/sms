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
const adminTimetableManager=require("../controllers/admin/admin-timetableManager.controller");

//member
const memberDash=require("../controllers/members/member-dashboard.controller");
const timetableCont=require("../controllers/members/timetable.controller");
const memberEventCont=require("../controllers/members/event.controller");
//genral
const chatCont=require("../controllers/general/chat.controller");
const forgetPassword=require("../controllers/general/forgetPassword.controller");


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
 Router.get("/blog-manager",adminDash.isAuth,blog.render_blogManager);

 Router.post("/getUpdateId",blog.post_getUpdateId);
 Router.get("/update-comment",blog.render_updateComment);
 Router.post("/update-comment",blog.post_updateComment);

 Router.post("/delete-comment",blog.deleteComment);
 
 //-----------------------------------------------------------------------------//
 //                          MEMBER ROUTES                                      //
 //----------------------------------------------------------------------------//
 Router.get("/member-dashboard",memberDash.isAuth,memberDash.render_memberDash);


//-----------------------------------------------------------------------------//
//                              ADMIN ROUTES                                   //
//-----------------------------------------------------------------------------//
 
//----------------------------------------------------//
//                 ADMIN DASHBOARD                    //
//----------------------------------------------------// 
 Router.get("/admin-dashboard",adminDash.isAuth,adminDash.render_adminDash);

//----------------------------------------------------// 
//                 ADMIN COMPOSE BLOGPOST             //
//----------------------------------------------------// 
 Router.get("/compose-blog-post",adminDash.isAuth,adminDash.render_composeBlogPost);
 Router.post("/compose-blog-post",adminDash.isAuth,adminDash.getBlogPost);

//----------------------------------------------------// 
//                 ADMIN MANAGE MEMBERS               //
//----------------------------------------------------// 
Router.get("/manage-members",adminDash.isAuth,adminDash.render_manageMembers);
//----------------------------------------------------// 
//                 ADMIN ADD MEMBERS                  //
//----------------------------------------------------// 
Router.get("/add-member",adminDash.isAuth,adminAddMember.render_addMember);
Router.post("/add-member",adminAddMember.admin_registerMember);
//----------------------------------------------------// 
//                 ADMIN CRUD SCREEN
//----------------------------------------------------// 
Router.get("/view-members",adminDash.isAuth,adminMemberCrud.render_memberCrud);                    //add auth
 
Router.get("/view-members/:var",adminDash.isAuth,adminMemberCrud.render_team);                    //add auth
Router.post("/view-members/:var",adminDash.isAuth,adminMemberCrud.redirect_team);                 //add auth

Router.post("/edit-member",adminDash.isAuth,adminMemberCrud.post_editMember);                     //add auth
Router.get("/edit-member",adminDash.isAuth,adminMemberCrud.editMember);          //add auth

Router.post("/update-member",adminDash.isAuth,adminMemberCrud.updateMember);                      //add auth

Router.post("/delete-member",adminDash.isAuth,adminMemberCrud.post_deleteMember);                 //add auth
Router.get("/delete-member",adminDash.isAuth,adminMemberCrud.deleteMember);                       //add auth


Router.get("/search-members",adminDash.isAuth,adminMemberCrud.render_searchMember);               //add auth
Router.get("/search-member",adminDash.isAuth,adminMemberCrud.searchMember);                       //add auth   
Router.post("/search-member",adminDash.isAuth,adminMemberCrud.post_searchMember);                 //add auth
                        //auth = adminDash.isAuth
//----------------------------------------------------// 
//               ADMIN EMAIL MANAGER                  //
//----------------------------------------------------// 
Router.get("/email-manager",adminDash.isAuth,adminDash.render_emailManager);
Router.get("/email-teacher",adminDash.isAuth,adminEmailManager.emailTeacher);


Router.get("/send-mail-to-teacher",adminDash.isAuth,adminEmailManager.render_sendMailToTeacher);
Router.post("/mailinfo",adminEmailManager.post_getMailInfo);

Router.get("/send-mail-to-anyone",adminDash.isAuth,adminEmailManager.render_sendMailToAnyone);
Router.post("/sendmail",adminEmailManager.post_sendmail);

Router.post("/generate-report",adminDash.post_genReport);
Router.get("/generate-report",adminDash.isAuth,adminDash.genReport);


//----------------------------------------------------// 
//                     TIMETABLE                      //
//----------------------------------------------------// 
Router.get("/member-timetable/:day/:slot",adminDash.isAuth,adminTimetableManager.render_memberTimetable);


//genenral (chat,blog)




//------------------------------------------------------------------------//
//                                EVENT MANAGER                           //
//------------------------------------------------------------------------//
Router.get("/event-manager",adminDash.isAuth,adminEventManager.render_eventManager);
Router.get("/add-event",adminDash.isAuth,adminEventManager.addEvent);
Router.post("/add-event",adminEventManager.post_addEvent);

Router.get("/event-crud",adminDash.isAuth,adminEventManager.render_eventCrud);
Router.post("/delete-event",adminEventManager.deleteEvent);


Router.post("/edit-event",adminEventManager.editEvent);
Router.get("/edit-event",adminDash.isAuth,adminEventManager.render_editEvent);
Router.post("/update-event",adminEventManager.updateEvent);

module.exports=Router;


//------------------------------------------------------------------------//
//                                TIMETABLE MANAGER                       //
//------------------------------------------------------------------------//

Router.get("/register-timetable/:day",memberDash.isAuth,timetableCont.render_registerTimetable);
Router.post("/register-timetable",timetableCont.post_registerTimetable);

Router.get("/timetable-manager",memberDash.isAuth,timetableCont.render_timetableManager);

Router.get("/update-timetable",memberDash.isAuth,timetableCont.render_updateTimetable);
Router.post("/update-timetable",timetableCont.updateTimetable);

Router.get("/view-timetable/:day",memberDash.isAuth,timetableCont.render_timetable);

//--------------------------------------------------------------------------//
//                               USER INFO                                  //
//--------------------------------------------------------------------------//
Router.get("/user-info",memberDash.isAuth,memberDash.render_userInfo);


Router.get("/approval-reqs",adminDash.isAuth,memberDash.render_approvalReq);
Router.post("/approval-reqs",adminDash.isAuth,memberDash.post_approvalReq);
//---------------------------------------------------------------------------//
//                                    view event                             //
//---------------------------------------------------------------------------//
Router.get("/view-event",memberEventCont.render_event);
Router.get("/view-event/:var",memberEventCont.render_event_post);

//-----------------------------------------------------------------------------//
//                                      Chat                                   //
//-----------------------------------------------------------------------------//
Router.get("/chatadmin",adminDash.isAuth,chatCont.render_chat);
Router.get("/chatmember",memberDash.isAuth,chatCont.render_chat);


//----------------------------------------------------------------------------//
Router.get("/signout-admin",adminDash.isAuth,adminDash.destroySession);
Router.get("/signout-member",memberDash.isAuth,memberDash.destroySession);

//-----------------------------------------------------------------------------//
//                             Forget Pasword                                  //
//-----------------------------------------------------------------------------//
Router.get("/forget-password",forgetPassword.render_forgetPassword);
Router.post("/forget-password",forgetPassword.post_forgetPassword);

Router.get("/verify-authpin",forgetPassword.render_verifyAuthPin);
Router.post("/verify-authpin",forgetPassword.post_verifyAuthPin);

//-----------------------------------------------------------------------------//
//                              HOME FILE                                      //
//-----------------------------------------------------------------------------//
Router.get("/",signinCont.render_home);