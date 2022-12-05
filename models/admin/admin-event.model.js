const connection = require("../../middleware/database");
q=require("q");
class eventModel
{
    static insert_event(obj)
    {
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var date = year + "-" + month + "-" + day;

        var Query='insert into event (eventName,eventDate,eventDetails,rollnum,fullname) values (?,?,?,?,?)';
        var dbPass=connection.query(Query,[obj.eventNames,obj.eventDates,obj.eventDetails,obj.rollnums,obj.fullnames],function(err,rows,fields)
        {  
            if (err) throw err;  
            console.log("1 record inserted into events");  
        });  

    }

    static get_event()
    {
      var deferred = q.defer();
      var Query='SELECT * FROM `event` ';
      var dbPass=connection.query(Query,function(err,rows,fields)
      {
        if(err)
        {
          deferred.reject(err);

        }
        else 
        {
          //console.log(rows);           
          deferred.resolve(rows);
        }
      });
        
      return deferred.promise;
    }

    static deleteEvent(eventId)
    {
      var Query='delete from `event` where eventId=? ';
      console.log(eventId);
      var dbPass=connection.query(Query,[eventId],function(err,rows,fields)
      {  
        if (err)
        throw err;  
        
        console.log("1 record deleted");  
      });
    }


    static updateEvent(obj)
    {
        var Query='update `event` set fullname=?,rollnum=?,eventDetails=?,eventName=?,eventDate=? where eventId=?';
        var dbPass=connection.query(Query,[obj.fullnames,obj.rollnums,obj.eventDetails,obj.eventNames,obj.eventDates,obj.eventIds],function(err,rows,fields)
        {  
          if (err) throw err;  
          console.log("1 record updated");  
        });
    }
}

module.exports=eventModel;