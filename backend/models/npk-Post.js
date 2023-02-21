const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    n : {
        type: String,
        required : true,
    },
    p : {
        type: String,
        required : true,
    },
    k : {
        type: String,
        required : true,
    },
    date: {
        type : String,
        default : Date.now,
    },

});

module.exports = mongoose.model("npks",PostSchema);