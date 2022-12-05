connection=require("../../middleware/database");
const q=require("q");

class timetableModel
{
    static insert_timetable=function(obj)
    {
        var Query='insert into timetable (rollnum,fullname,day,team,slot1,slot2,slot3,slot4,slot5,slot6) values (?,?,?,?,?,?,?,?,?,?)';
        connection.query(Query,[obj.rollnums,obj.fullnames,obj.days,obj.teams,obj.slot1,obj.slot2,obj.slot3,obj.slot4,obj.slot5,obj.slot6],function(err,rows,fields)
        {  
            if (err)
            {
                console.log("duplicate entry");
            }
            else  
            console.log("1 record inserted into timetable");  
        });  
    }

    static update_timetable=function(obj)
    {
        var Query='update `timetable` set fullname=?,slot1=?,slot2=?,slot3=?,slot4=?,slot5=?,slot6=? where rollnum=? && day=?';
        let data = [obj.fullnames,obj.slot1,obj.slot2,obj.slot3,obj.slot4,obj.slot5,obj.slot6,obj.rollnums,obj.days];
        connection.query(Query, data, (error, results, fields) => 
        {
            if (error)
            {
              return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
        });
    }

    static view_timetable=function(obj)
    {
      var deferred = q.defer();
      var Query='SELECT  * FROM `timetable` WHERE rollnum=? && day=?';
      var dbPass=connection.query(Query,[obj.rollnums,obj.days],function(err,rows,fields)
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
}
module.exports=timetableModel;