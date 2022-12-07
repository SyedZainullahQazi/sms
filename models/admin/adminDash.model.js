const connection=require("../../middleware/database");
const q=require("q");

class adminModel
{
    static get_team=function(req,res)
    {
      var deferred = q.defer();
      var Query="SELECT team FROM `members`";
      
      connection.query(Query,function(err,rows,fields)
      {
        if(err)
        {
          deferred.reject(err);

        }
        else 
        {
          console.log(rows);           
          deferred.resolve(rows);
        }
      });
        
      return deferred.promise;
    }
}

module.exports=adminModel;