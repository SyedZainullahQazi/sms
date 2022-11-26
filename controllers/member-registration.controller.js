const member_registration=require("../models/member-registration.model");
const bodyParser=require("body-parser");



class memberRegistration
{


    static render_memberRegistration=function(req,res)
    {
       req.session.user="x";
       res.render("member-registration.ejs");
    }

    static registerMember=function(req,res)
    {
        console.log("hello baby");

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
        member_registration.add_member(inductionReq);
    }
}

module.exports=memberRegistration;
