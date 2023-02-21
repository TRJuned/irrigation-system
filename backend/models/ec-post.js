const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    e : {
        type: String,
        required : true,
    },
    date: {
        type : String,
        default : Date.now,
    },

});

module.exports = mongoose.model("ecs",PostSchema);