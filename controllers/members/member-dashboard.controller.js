const memberDb=require("../../models/member/memberDash.model");

class memberDash
{
    static isAuth=function(req,res,next)
    {
        if(req.session.isAuth==true && req.session.role=="member")
        {
            if(req.session.pendingStatus==0)
            {
                next();
            }
            else
            {
                res.send("Your Application of Registration is Pending Wait For Admin Reply");
            }
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

    static render_approvalReq(req,res)
    {
        memberDb.get_pending().then(
            function(rows)
            {
                if(rows.length>0)
                {
                    res.render("./admin/approval-req.ejs",{std:rows});
                }
            },
            function(error)
            {
                console.log(error);
            })
    }

    static post_approvalReq(req,res)
    {
        let {approve}=req.body;
        memberDb.update_pending(approve);
        res.redirect("/approval-reqs");
    }
}

module.exports=memberDash;