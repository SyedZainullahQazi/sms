
const signinDb=require("../models/signin.model");

class siginController
{

  //---------------------------------------//
  //    Renders Sigin Page                 //
  //---------------------------------------//    

    static render_signin=function(req,res)
    {
        if(req.session.isAuth==true && req.session.role=="admin")
        {res.render("./admin/admin-dashboard.ejs");}
        else if(req.session.isAuth==true && req.session.role=="member")
        {res.render("./member/member-dashboard.ejs");}
        else
        {res.render("student_login.ejs");}
    }
    //--------------------------------------------//
    //Authenticate User Pass and role and redirect//
    //--------------------------------------------//
    static signin=function(req,res)
    {
      var {email,password}=req.body;
      signinDb.checkUser(email,password).then(function(rows)
      {
        if(rows.length>0)
        {
          if(rows[0].password==password)
          {
            req.session.isAuth=true;
            req.session.rollnum=rows[0].rollnum;
            req.session.fullname=rows[0].fullname;


            if(rows[0].role=="member")
            {
              req.session.role="member";
              res.redirect("member-dashboard");
            }
            else if(rows[0].role=="admin")
            {
              
              req.session.role="admin";
              res.redirect("admin-dashboard");
            }
            else if(rows[0].role=="mentor")
            {
              req.session.role="mentor";
            }
          }
          else
          {
            console.log("Auth Check Failed : "+authCheck);
            res.send("UnAuthorized - Wrong Password");
            req.session.isAuth=false;
          }
        }
        else
        {
          req.session.isAuth=false;
          res.send("No such User");
        }

      },function(error)
      {
        // This function get called, when error
        console.log(error);
      });
    }
}

module.exports=siginController;
