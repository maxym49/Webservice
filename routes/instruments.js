var express = require("express");
var router = express.Router();
var Instrument = require("../models/instrument");
var supportFunc = require("../support_func");

//-------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------//


router.get("/", function(req, res) {
    Instrument.find({}, function (err, allinstruments){
        if(err){
            console.log(err);
        }
        else{
            res.render("instruments/index", {instruments : allinstruments, });
        }
    });
    
});

router.post("/", supportFunc.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var img = req.body.img;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newInstrument = {name: name, img: img, description: description, author: author, price: price};
    console.log(req.user);
    Instrument.create(newInstrument, function(err, newlyCreated) {
       if(err){
           console.log(err);
       }
       else{
           req.flash("sucpost", "A new post has been added!");
           res.redirect("/instruments");
       }
    });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------//

router.get("/new", supportFunc.isLoggedIn, function(req, res) {
    res.render("instruments/new");
});

router.get("/:id", function(req,res) {
   Instrument.findById(req.params.id).populate("comments").exec(function(err, foundInstrument) {
       if(err){
           console.log(err);
       }
       else{
          res.render("instruments/show", {instrument: foundInstrument});
       }
   });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------//

router.get("/:id/edit", function(req, res) {
        Instrument.findById(req.params.id, function (err, foundInstrument) {
            if(err){
                 res.send("Something went wrong");
            }
            else{
                res.render("instruments/edit", {instrument: foundInstrument}); 
            }
        });
});

router.put("/:id", supportFunc.checkUser, function(req, res) {
    Instrument.findByIdAndUpdate(req.params.id, req.body.instrument, function(err, updatedInstrument) {
        if(err){
            console.log(err);
        } 
        else{
             res.redirect("/instruments/" + updatedInstrument._id); 
        }
    });
});

router.delete("/:id", supportFunc.checkUser, function (req, res) {
     Instrument.findByIdAndRemove(req.params.id, function(err) {
         if(err){
             console.log(err);
         } 
         else{
             req.flash("delpost", "Your post has been deleted!");
             res.redirect("/instruments");
         }
     });
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------------------------//


module.exports = router;