const mr=require("../../models/member-registration.model");  //dbModel for adding the member



class addMember
{
    //-----------------------------------------------------------//
    //         RENDERS ADMIN ADD MEMBER PAGE                     //
    //-----------------------------------------------------------//
    static render_addMember=function(req,res)
    {
        res.render("./admin/add-member.ejs")
    }
    //-----------------------------------------------------------//
    //         READS THE FILLED COLS AND STORE iN DB             //
    //-----------------------------------------------------------//
    static admin_registerMember=function(req,res)
    {
        console.log("CALLED IN");
        const inductionReq=
        {
            
            fullname:req.body.fullname,
            dob:req.body.dob,
            team:req.body.team,
            rollnum:req.body.rollnum,
            email:req.body.email,
            password:req.body.password,
            cgpa:req.body.cgpa,
            whatsapp:req.body.whatsapp,
            skills:req.body.skills,
            gender:req.body.gender
        };
        mr.add_member(inductionReq);
        res.redirect("/add-member");
    }
}

module.exports=addMember;
