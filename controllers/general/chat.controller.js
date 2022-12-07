

class chat
{
    static render_chat=function(req,res)
    {
        let fullname=req.session.fullname;
        fullname = fullname.replace(/\s/g, '');
        console.log(fullname);

        let flagVal=10;
        console.log(req.session.role);

        if(req.session.role=="member")
        {
            res.render("./member/chat.ejs",{name:fullname});
        }
        else 
        {
            res.render("./admin/chat.ejs",{name:fullname});
        }
    }
}

module.exports=chat;