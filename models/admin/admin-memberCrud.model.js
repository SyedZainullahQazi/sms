const connection=require("../../middleware/database");
var q = require('q');

class memberCrudDB
{
    //-----------------------------------------//
    //   GETS INFO FROM MEMBER TABLE ALL       //
    //-----------------------------------------//
    static getMembersInfo()
    {
      var deferred = q.defer();
      var Query='SELECT * FROM `members` ';
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

    //------------------------------------------//
    //         GET ALL TECHNICAL MEMBERS        //
    //------------------------------------------//
    static getTechnical()
    {
      var deferred = q.defer();
      var tech="Technical Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[tech],function(err,rows,fields)
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
    //-------------------------------------------//
    //          GET ALL LOGISTICS MEMBERS        //
    //-------------------------------------------//
    static getLogistics()
    {
      var deferred = q.defer();
      var team="Logistics Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[team],function(err,rows,fields)
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
    //---------------------------------------------//
    //            GET ALL FINANCS                  //
    //---------------------------------------------//
    static getFinance()
    {
      var deferred = q.defer();
      var team="Finance Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[team],function(err,rows,fields)
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

    //----------------------------------------//
    //               GET MARKETING            //
    //----------------------------------------//
    static getMarketing()
    {
      var deferred = q.defer();
      var team="Marketing Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[team],function(err,rows,fields)
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
    //-----------------------------------------------//
    //                  GET ADMIN                    //
    //-----------------------------------------------//
    static getAdmin()
    {
      var deferred = q.defer();
      var team="Admin Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[team],function(err,rows,fields)
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
    
    //------------------------------------------//
    //               EDIT MEMBER                //
    //------------------------------------------//
    static editMember(obj)
    {
      
      var Query='update `members` set fullname=?,dob=?,team=?,email=?,password=?,cgpa=?,whatsapp=?,skills=?,gender=? where rollnum=?';
      var dbPass=connection.query(Query,[obj.fullname,obj.dob,obj.team,obj.email,obj.password,obj.cgpa,obj.whatsapp,obj.skills,obj.gender,obj.rollnum],function(err,rows,fields)
      {  
        if (err) throw err;  
        console.log("1 record updated");  
      });
    }
    //--------------------------------------------//
    //               DELETE MEMBERS               //
    //--------------------------------------------//
    static deleteMember(roll)
    {
      var Query='delete from `members` where rollnum=? ';
      var dbPass=connection.query(Query,[roll],function(err,rows,fields)
      {  
        if (err) throw err;  
        console.log("1 record deleted");  
      });
    }
    //--------------------------------------------//
    //               SEARCH MEMBERS               //
    //--------------------------------------------//
    static searchMember(roll)
    {
      var deferred = q.defer();
      var Query="SELECT * FROM `members` where rollnum=?";
      connection.query(Query,[roll],function(err,rows,fields)
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

module.exports=memberCrudDB;