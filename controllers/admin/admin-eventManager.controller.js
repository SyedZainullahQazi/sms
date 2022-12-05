const eventModel=require("../../models/admin/admin-event.model");

class eventManager
{
    //-------------------------------------------------//
    //               RENDERS EVENT MANAGER             //
    //-------------------------------------------------//
    static render_eventManager(req,res)
    {
        res.render("./admin/event-manager.ejs");
    }

    //------------------------------------------------//
    //              ADD EVENT                         //
    //------------------------------------------------//
    static addEvent(req,res)
    {
        res.render("./admin/add-event.ejs");
    }
    //------------------------------------------------//
    //            POST ADD EVENT                      //
    //------------------------------------------------//
    static post_addEvent(req,res)
    {
        let roll=req.session.rollnum;   
        let name=req.session.fullname;
        let {eventName,eventDate,eventDetail}=req.body;

        let obj=
        {
            rollnums:roll,
            fullnames:name,
            eventNames:eventName,
            eventDates:eventDate,
            eventDetails:eventDetail
        }
        eventModel.insert_event(obj);

        res.redirect("/add-event")
    }


    static render_eventCrud(req,res)
    {
        eventModel.get_event().then(function(rows)
        {
            res.render("./admin/event-crud.ejs",{event:rows});
        },
        function(error)
        {
            console.log(error);
        })
    }

    static deleteEvent(req,res)
    {
        var {del}=req.body;
        console.log("The event ID : "+del);
        
        eventModel.deleteEvent(del);
        res.redirect("/event-crud");
    }

    static editEvent(req,res)
    {
        let {edit}=req.body;

        let string = encodeURIComponent(edit);
        res.redirect("/edit-event?valid="+string);
    }
    static render_editEvent(req,res)
    {
        let eventId = req.query.valid;
        res.render("./admin/edit-event.ejs",{id:eventId});
    }

    static updateEvent(req,res)
    {
        var {eventDetail,eventName,eventDate,eventId}=req.body;
        let rollnum= req.session.rollnum;
        let fullname=req.session.fullname;

        let obj=
        {
            eventDetails:eventDetail,
            eventNames:eventName,
            eventDates:eventDate,
            rollnums:rollnum,
            eventIds:eventId,
            fullnames:fullname
        }

        eventModel.updateEvent(obj);
        res.redirect("/event-crud");
    }

}

module.exports=eventManager;