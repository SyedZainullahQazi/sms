var blogDb=require("../../models/general/blog.model");
var _=require("lodash");

class blog
{
    
    static render_blog=function(req,res)
    {
        let allPosts=[];  
        blogDb.getBlogData().then(function(rows)
        {
            if(rows.length>0)
            {
              for(let i=0;i<rows.length;i++)
              {   
                let postx=
                {
                  title:"",
                  blogPost:""
                };
                postx.title=rows[i].title;
                postx.blogPost=rows[i].post;
                allPosts.push(postx);
              }
                res.render("./general/blog.ejs",{posts:allPosts});
            }
            else
            {
                res.render("./genral/blog.ejs",{posts:allPosts});
            }
        },function(error)
        {
          // This function get called, when error
          console.log(error);
        });
        
    }

    static render_blogPost=function(req,res)
    {
        

        let allPosts=[];

        blogDb.getBlogData().then(function(rows)
        {
            if(rows.length>0)
            {
                for(let i=0;i<rows.length;i++)
                {
                    let postx={blogPost:"",title:""};
                    postx.blogPost=rows[i].post;
                    postx.title=rows[i].title;

                    allPosts.push(postx);
                }
                
                allPosts.forEach(function(elements)
                {
                    if(_.lowerCase(elements.title)===_.lowerCase(req.params.var))
                    {
                      res.render('./general/post.ejs',{heading:elements.title,content:elements.blogPost});
                    }
                })
            }
        },function(error)
        {
          // This function get called, when error
          console.log(error);
        });


       
    }
}

module.exports=blog;