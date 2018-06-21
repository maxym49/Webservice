var Comment = require("../models/comment");
var Instrument = require("../models/instrument");


var supObject = {
    checkUser: function(req, res, next){
      if(req.isAuthenticated()){
        Instrument.findById(req.params.id, function(err, foundInstrument) {
            if(err){
                req.flash("err", "You need to be logged in before!");
                res.redirect("/instruments");
            } 
            else{
                 if(foundInstrument.author.id.equals(req.user._id)){
                      next();
                 }
                 else{
                     res.redirect("back");
                 }
            }
        });
    }
    else{
        res.redirect("back");
        }

   }, 
    isLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("err", "You need to be logged in before!");
        res.redirect("/login");
    },
    checkCommentUser: function (req, res, next) {
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("err", "You need to be logged in before!");
                    res.redirect("back");
                } else {
                    
                    if(foundComment.author.id.equals(req.user._id)) {
                        console.log(foundComment.author.id)
                        next();    
                    } else {
                        res.redirect("back");
                    }
                }
            });
    } else {
        res.redirect("back");
        }
    }
}




module.exports = supObject;