var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/about", function(req, res){
    res.render("about");
});

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err){
            req.flash("registererror", "Type of error is: " + err.message);
            console.log(err);
            return res.redirect("register");
        }
            passport.authenticate("local")(req, res, function(argument) {
                req.flash("welcome", "Welcome " + req.user.username +"!");
                res.redirect("/instruments");
            });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {   
        successRedirect: "/instruments", 
        failureRedirect: "/login"
    }), function(req, res) {
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("lout", "You have successfully logged out from the site!");
    res.redirect("/instruments");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;