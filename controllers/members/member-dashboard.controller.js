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
}

module.exports=memberDash;