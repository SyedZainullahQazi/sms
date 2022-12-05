const connection=require("../../middleware/database");
const q=require("q");

class ttModel
{
    static get_timetable(day,slot)
    {
      var deferred = q.defer();
      var Query="SELECT * FROM `timetable` where day=? && "+slot+" =?";
      
      var dbPass=connection.query(Query,[day,"free"],function(err,rows,fields)
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

module.exports=ttModel;