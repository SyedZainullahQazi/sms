const ttDb=require("../../models/admin/timetableManager.model");

class ttManager
{
    static render_memberTimetable(req,res)
    {
       let day=req.params.day;
       let slot=req.params.slot;

       ttDb.get_timetable(day,slot).then(function(rows)
       {
            res.render("./admin/member-timetable.ejs",{dayname:day,member:rows});  
       },
       function(error)
       {
           console.log(error);
       });
       
    }

}
module.exports=ttManager;