var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Instrument = require("./models/instrument");
var Comment = require("./models/comment");
var User = require("./models/user");
var passport = require("passport");
var flash = require("connect-flash");
var LocalStrategy = require("passport-local");
var commentRoutes = require("./routes/comments");
var instrumentRoutes = require("./routes/instruments");
var indexRoutes = require("./routes/index");
var methodOverride = require("method-override");
var moment = require("moment");
var frontfunc = require("./support_func/frontfunc");
var $ = require('jquery');


mongoose.connect("mongodb://localhost/hbase");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/support_func"));
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "The secret",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  app.locals.moment = require('moment');
  res.locals.err = req.flash("err");
  res.locals.lout = req.flash("lout");
  res.locals.succomment = req.flash("succomment");
  res.locals.delecomment = req.flash("delecomment");
  res.locals.sucpost = req.flash("sucpost");
  res.locals.delpost = req.flash("delpost");
  res.locals.welcome = req.flash("welcome");
  res.locals.registererror = req.flash("registererror");
  
  next();
});



app.use(indexRoutes);
app.use("/instruments/:id/comments", commentRoutes);
app.use("/instruments", instrumentRoutes);
//-----------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------//

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The sever is running!");
});