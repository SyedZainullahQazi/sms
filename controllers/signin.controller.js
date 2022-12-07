
const signinDb=require("../models/signin.model");

class siginController
{

  //---------------------------------------//
  //    Renders Sigin Page                 //
  //---------------------------------------//    

    static render_signin=function(req,res)
    {
        if(req.session.isAuth==true && req.session.role=="admin")
        {res.redirect("/admin-dashboard");}
        else if(req.session.isAuth==true && req.session.role=="member" )
        {
          if(req.session.pendingStatus==0)
          {
            res.render("./member/member-dashboard.ejs");
          }
          else
          {
            res.render("student_login.ejs");
          }
        }
        else
        {
          res.render("student_login.ejs");
        }
    }
    //--------------------------------------------//
    //Authenticate User Pass and role and redirect//
    //--------------------------------------------//
    static signin=function(req,res)
    {
      var {email,password}=req.body;
      signinDb.checkUser(email).then(function(rows)
      {
        if(rows.length>0)
        {
          console.log(password);
          if(rows[0].password==password)
          {
            req.session.isAuth=true;
            req.session.rollnum=rows[0].rollnum;
            req.session.fullname=rows[0].fullname;
            req.session.email=rows[0].email;
            req.session.password=rows[0].password;
            req.session.team=rows[0].team;

            if(rows[0].role=="member" )
            {
              req.session.role="member";
              req.session.pendingStatus=rows[0].pendingStatus;

              res.redirect("/member-dashboard");
            }
            else if(rows[0].role=="admin")
            {
              
              req.session.role="admin";
              res.redirect("admin-dashboard");
            }
          }
          else 
          {
            res.send("UnAuthorized - Wrong Password (Please Try Again)");
            req.session.isAuth=false;
          }
          
        }
        else
        {
          req.session.isAuth=false;
          res.send("No such User Exsist - Retry Login With Registered Email");
        }

      },function(error)
      {
        // This function get called, when error
        console.log(error);
      });
    }
}

module.exports=siginController;
