var mongoose = require("mongoose");

var instrumentSchema = new mongoose.Schema({
    name: String,
    img:  String,
    description: String,
    price: String,
    time: {
        type: Date, 
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
});

module.exports = mongoose.model("Instrument", instrumentSchema);