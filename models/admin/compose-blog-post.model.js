const connection=require("../../middleware/database");

class blogPost 
{
    static insertBlogPost=function(title,post,rollnum,name)
    {
        var date_ob = new Date();
        var day = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var date = year + "-" + month + "-" + day;

        var Query='insert into blog (post,title,authorId,authorName,date) values (?,?,?,?,?)';
        var dbPass=connection.query(Query,[post,title,rollnum,name,date],function(err,rows,fields)
        {  
            if (err) throw err;  
            console.log("1 record inserted");  
        });  
          
    }
}

module.exports=blogPost;