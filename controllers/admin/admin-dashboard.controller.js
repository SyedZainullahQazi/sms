const blogpostDb=require("../../models/admin/compose-blog-post.model");
var q = require('q');
const { render } = require("ejs");

class adminDash
{
    //----------------------------------------------------------//
    //               SESSION AND ROLE AUTHENTICATION            //
    //----------------------------------------------------------//
    static isAuth=function(req,res,next)
    {
        if(req.session.isAuth==true && req.session.role=="admin")
        {
            next();
        }
        else
        {
            res.redirect("signin");
        }
    }

    //-----------------------------------------------------------//
    //                    RENDER ADMIN DASHBOARD                 //
    //-----------------------------------------------------------//
    static render_adminDash(req,res)
    {
        res.render("./admin/admin-dashboard.ejs");
    }
    //-----------------------------------------------------------//
    //                    RENDER COMPOSE BLOG POST               //
    //-----------------------------------------------------------//
    static render_composeBlogPost=function(req,res)
    {
        res.render("./admin/compose.ejs");
    }
    //-----------------------------------------------------------//
    //           STORE COMPOSED BLOG POST INTO DATABASE          //
    //-----------------------------------------------------------//
    static getBlogPost=function(req,res)
    {
        var {blogTitle,blogPost}=req.body;
        blogpostDb.insertBlogPost(blogTitle,blogPost,req.session.rollnum,req.session.fullname);
    }
    //-----------------------------------------------------------//
    //         MANAGE MEMBERS RENDERING                          //
    //-----------------------------------------------------------//
    static render_manageMembers=function(req,res)
    {
        res.render("./admin/manage-members.ejs")
    }
   
}

module.exports=adminDash;