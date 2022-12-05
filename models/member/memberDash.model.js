connection=require("../../middleware/database");

class memberDash
{
    static get_info(roll)
    {
      var deferred = q.defer();
      var Query='SELECT  * FROM `members` WHERE rollnum=?';
      var dbPass=connection.query(Query,[roll],function(err,rows,fields)
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

module.exports=memberDash;