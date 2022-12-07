const q=require("q");
const connection=require("../../middleware/database");

class eventModel
{
    static get_events()
    {
      var deferred = q.defer();
      var Query='SELECT  * FROM `event`';
      connection.query(Query,function(err,rows,fields)
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

    static get_eventPost(id)
    {
      var deferred = q.defer();
      var Query='SELECT  * FROM `event` where eventId=?';
      console.log(Query);
      connection.query(Query,[id],function(err,rows,fields)
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

module.exports=eventModel;