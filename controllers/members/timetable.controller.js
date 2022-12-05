const e = require("express");
const timetableDb=require("../../models/member/timetable.model")

class timetableController
{
    static render_registerTimetable=function(req,res)
    {
        let currDay=req.params.day;
        res.render("./member/register-timetable.ejs",{day:currDay});
    }

    static post_registerTimetable=function(req,res)
    {
        
        let {dayname,slotOne,slotTwo,slotThree,slotFour,slotFive,slotSix}=req.body;
        let userRollnum=req.session.rollnum;
        let userFullname=req.session.fullname;

        if ( typeof slotOne !== 'undefined' && slotOne )slotOne="free"; else slotOne="notfree";
        if ( typeof slotTwo !== 'undefined' && slotTwo )slotTwo="free"; else slotTwo="notfree";
        if ( typeof slotThree !== 'undefined' && slotThree )slotThree="free"; else slotThree="notfree";
        if ( typeof slotFour !== 'undefined' && slotFour )slotFour="free"; else slotFour="notfree";
        if ( typeof slotFive !== 'undefined' && slotFive )slotFive="free"; else slotFive="notfree";
        if ( typeof slotFive !== 'undefined' && slotFive )slotFive="free"; else slotFive="notfree";
        if ( typeof slotSix !== 'undefined' && slotSix )slotSix="free"; else slotSix="notfree";

        let obj=
        {
            slot1:slotOne,
            slot2:slotTwo,
            slot3:slotThree,
            slot4:slotFour,
            slot5:slotFive,
            slot6:slotSix,
            rollnums:userRollnum,
            fullnames:userFullname,
            days:dayname
        }

        timetableDb.insert_timetable(obj);
        res.redirect("/register-timetable/monday");
    }
    static render_timetableManager=function(req,res)
    {
        res.render("./member/timetable-manager.ejs")
    }

    static render_updateTimetable(req,res)
    {
        res.render("./member/update-timetable.ejs");
    }

    static updateTimetable(req,res)
    {
        let {dayname,slotOne,slotTwo,slotThree,slotFour,slotFive,slotSix}=req.body;
        let userRollnum=req.session.rollnum;
        let userFullname=req.session.fullname;

        console.log(dayname);

        if ( typeof slotOne !== 'undefined' && slotOne )slotOne="free"; else slotOne="notfree";
        if ( typeof slotTwo !== 'undefined' && slotTwo )slotTwo="free"; else slotTwo="notfree";
        if ( typeof slotThree !== 'undefined' && slotThree )slotThree="free"; else slotThree="notfree";
        if ( typeof slotFour !== 'undefined' && slotFour )slotFour="free"; else slotFour="notfree";
        if ( typeof slotFive !== 'undefined' && slotFive )slotFive="free"; else slotFive="notfree";
        if ( typeof slotSix !== 'undefined' && slotSix )slotSix="free"; else slotSix="notfree";

        let objs=
        {
            slot1:slotOne,
            slot2:slotTwo,
            slot3:slotThree,
            slot4:slotFour,
            slot5:slotFive,
            slot6:slotSix,
            rollnums:userRollnum,
            fullnames:userFullname,
            days:dayname
        }
    
        timetableDb.update_timetable(objs);
        res.redirect("/update-timetable");
    }

    static render_timetable(req,res)
    {
        let day=req.params.day;
        let rollnum=req.session.rollnum;
        let obj={rollnums:rollnum,days:day};


        timetableDb.view_timetable(obj).then(function (rows) 
        {
            if (rows.length > 0) 
            {
                res.render("./member/view-table.ejs", { dayname: day,timetable:rows});
            }
            else
            {
                res.redirect("/register-timetable/"+day);
            }
        },
        function (error) 
        {
            res.redirect("/timetable-manager");
        });
    }
}

module.exports=timetableController;