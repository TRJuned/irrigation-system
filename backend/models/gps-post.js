const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    time : {
        type: String,
        required : true,
    },
    location : {
        type: String,
        required : true,
    },
    date: {
        type : String,
        default : Date.now,
    },

});

module.exports = mongoose.model("gps",PostSchema);