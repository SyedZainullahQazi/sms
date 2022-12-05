var blogDb = require("../../models/general/blog.model");
var _ = require("lodash");
const { render } = require("ejs");

class blog {

  static render_blog = function (req, res) {
    let allPosts = [];
    blogDb.getBlogData().then(function (rows) {
      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
          let postx =
          {
            title: "",
            blogPost: ""
          };
          postx.title = rows[i].title;
          postx.blogPost = rows[i].post;
          allPosts.push(postx);
        }
        res.render("./general/blog.ejs", { posts: allPosts });
      }
      else {
        res.render("./genral/blog.ejs", { posts: allPosts });
      }
    }, function (error) {
      // This function get called, when error
      console.log(error);
    });

  }

  static render_blogPost = function (req, res) {


    let allPosts = [];

    blogDb.getBlogData().then(function (rows) {
      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
          let postx = { blogPost: "", title: "" };
          postx.blogPost = rows[i].post;
          postx.title = rows[i].title;

          allPosts.push(postx);
        }

        allPosts.forEach(function (elements) {
          if (_.lowerCase(elements.title) === _.lowerCase(req.params.var)) 
          {
            var commentObj =
            {
              role: req.session.role,
              isAuth: req.session.isAuth,
            }
            blogDb.getBlogPost(elements.title).then(function (rows) 
            {
              console.log(rows[0].blogId);
              blogDb.getComments(rows[0].blogId).then(function(blogcomments)
              {
                res.render('./general/post.ejs', { 
                  heading: elements.title, 
                  content: elements.blogPost,
                   comment: commentObj,
                   comments:blogcomments }); 

              },function(errors)
              {
                console.log(errors)
              });
            }
            ,function (error) 
            {
              // This function get called, when error
              console.log(error);
            });

          }
        })
      }
    }, function (error) {
      // This function get called, when error
      console.log(error);
    });
  }
  //---------------------------------------------------------//
  //             COMMENTS                                    //
  //---------------------------------------------------------//
  static post_comment(req,res)
  {
    var {title,comment}=req.body;
    var rollnum=req.session.rollnum;
    console.log(title+" "+comment+" "+rollnum)
    blogDb.getBlogPost(title).then(function (rows) 
    {
      console.log(rows[0].blogId);
      blogDb.insertComment(rows[0].blogId,comment,rollnum);
      res.redirect('back');
    }
    ,function (error) 
    {
      // This function get called, when error
      console.log(error);
    });

  }
  //---------------------------------------------------------//
  //             COMMENTS                                    //
  //---------------------------------------------------------//
  static render_blogManager=function(req,res)
  {
    res.render("./admin/blog-manager.ejs")
  }
}

module.exports = blog;