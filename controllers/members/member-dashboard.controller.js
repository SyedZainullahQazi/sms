const memberDb=require("../../models/member/memberDash.model");

class memberDash
{
    static isAuth=function(req,res,next)
    {
        if(req.session.isAuth==true && req.session.role=="member")
        {
            next();
        }
        else
        {
            res.redirect("signin");
        }
    }

    static render_memberDash(req,res)
    {
        res.render("./member/member-dashboard.ejs");
    }

    static render_userInfo(req,res)
    {
        memberDb.get_info(req.session.rollnum).then(function(rows)
        {
            if(rows.length>0)
            {
                res.render("./member/user-info.ejs",{user:rows});
            }
            else
            {
                res.redirect("/member-dashboard");
            }
        },function(error)
        {
            console.log(error);
        })
    }
}

module.exports=memberDash;