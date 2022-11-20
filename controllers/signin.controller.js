
class siginController
{
    static memberRegistration=function(req,res)
    {
       res.render("member-registration.ejs");
    }

    static signin=function(req,res)
    {
        res.render("student_login.ejs");
    }

}

module.exports=siginController;