const eventDb=require("../../models/member/events.model")

class eventCont
{
    static render_event=function(req,res)
    {
        eventDb.get_events().then(function(rows)
        {
            res.render("./member/events.ejs",{posts:rows})
        },function(error)
        {
            console.log(error);
        })
        
    }

    static render_event_post(req,res)
    {
        console.log(req.params.var);
        let eventid=req.params.var;

        eventDb.get_eventPost(eventid).then(function(rows)
        {
            if(rows.length>0)
            {
            res.render("./member/eventPost.ejs",{event:rows});
            }
            else{res.redirect("/member-dashboard");}
        },
        function(error)
        {

        })
    }
}

module.exports=eventCont;