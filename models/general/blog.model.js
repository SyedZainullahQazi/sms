var connection=require("../../middleware/database");
var q=require("q");

class blogDb
{
    static getBlogData=function(req,res)
    {
      var deferred = q.defer();
      var Query='SELECT * FROM blog';
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
}

module.exports=blogDb;