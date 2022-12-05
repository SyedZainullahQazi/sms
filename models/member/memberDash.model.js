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



    static get_pending()
    {
      var deferred = q.defer();
      var Query='SELECT  * FROM `members` WHERE pendingStatus=?';
      var dbPass=connection.query(Query,[1],function(err,rows,fields)
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

    static update_pending(roll)
    {
      var Query='update `members` set pendingStatus=? where rollnum=?';
      var dbPass=connection.query(Query,[0,roll],function(err,rows,fields)
      {  
        if (err) throw err;  
        console.log("1 record updated");  
      });
    }


}

module.exports=memberDash;