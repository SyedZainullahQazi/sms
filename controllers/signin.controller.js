
const signinDb=require("../models/signin.model");

class siginController
{

  //---------------------------------------//
  //    Renders Sigin Page                 //
  //---------------------------------------//    

    static render_signin=function(req,res)
    {
        req.session.isAuth=false;
        req.session.role="";
        res.render("student_login.ejs");
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
            if(rows[0].role=="member")
            {
              req.session.role="member";
              res.redirect("/member-dashboard")
            }
            else if(role[0].role=="admin")
            {
              req.session.role="admin";
            }
            else if(role[0].role=="mentor")
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
