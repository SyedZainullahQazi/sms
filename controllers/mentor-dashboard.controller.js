const e = require("express");

class mentorDash
{
    static isAuth=function(req,res,next)
    {
        if(req.session.isAuth==true && req.session.role=="mentor")
        {
            console.log("The User is Authenticated");
            next();   
        }
        else
        {
            res.redirect("/signin")
        }
    }
    static render_mentorDash=function(req,res)
    {
        res.render(admin-dashboard.js);
    }
}

module.exports=mentorDash;