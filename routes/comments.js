var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Instrument = require("../models/instrument");
var supportFunc = require("../support_func");


router.get("/new", supportFunc.isLoggedIn, function(req, res) {
    Instrument.findById(req.params.id, function(err, instrument) {
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {instrument: instrument});
        }
    });
});

router.post("/", function(req, res) {
    Instrument.findById(req.params.id,function(err, instrument) {
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            Comment.create(req.body.comment, function(err, comment) {
                if(err){
                    console.log(err);
                }
                else{
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    comment.save();
                    console.log("new comment from " + req.user.username);
                    instrument.comments.push(comment);
                    instrument.save();
                    req.flash("succomment", "Your comment has been added!");
                    res.redirect("/instruments/" + instrument._id)
                }
            });
        }
    });
});


router.get("/:comment_id/edit", supportFunc.checkCommentUser, function(req, res) {
   Comment.findById(req.params.comment_id, function(err, foundComment) {
       if(err){
           res.redirect("/");
       }
       else{
           res.render("comments/edit", {instrumentid: req.params.id, comment: foundComment});
       }
   });
});

router.put("/:comment_id", supportFunc.checkCommentUser, function(req, res) {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if(err){
           res.redirect("/");
       }
       else{
           res.redirect("/instruments/"+ req.params.id);
       }
   });
});

router.delete("/:comment_id", supportFunc.checkCommentUser, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err){
            console.log(err);
            res.redirect("/instruments/"+req.params.id);
        }
        else{
            req.flash("delecomment", "Your comment has been deleted!");
            res.redirect("/instruments/"+req.params.id);
        }
    });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------//


module.exports = router;