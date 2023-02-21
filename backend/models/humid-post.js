const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    h1 : {
        type: String,
        required : true,
    },
    date: {
        type : String,
        default : Date.now,
    },

});

module.exports = mongoose.model("humidities",PostSchema);