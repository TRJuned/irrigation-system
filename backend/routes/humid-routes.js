const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const humidPost = require('../models/humid-post'); 

//Get all the data
router.get("/", async (req,res) => {
    try {
        const humid1 = await humidPost.find();
        res.json(humid1);
    } catch (error) {
        res.json({message: err});
    }
});

//get a specific data
router.get("/:postId", async (req,res) => {
    try {
        const humid2 = await humidPost.findById(req.params.postId);
        res.json(humid2);
    } catch (error) {
        res.json({message: err});
    }
});


//save a post
router.post('/', async (req,res) => {
    const humid = new humidPost({
        h1 : req.body.h1,
    });

    try {
        const savedPost = await humid.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//Update a specific post
router.patch("/:postId", async (req,res) => {
    try {
        const updatePost = await humidPost.updateOne(
            { _id : req.params.postId },
            {
                $set : {
                    h1 : req.body.h1,
            },
        }
        );

        res.json(updatePost);
    } catch (err) {
        res.status(400).send({message: err});
    }
});

//Delete a specific post
router.delete("/:postId", async (req,res) => {
    try {
        const removePost = await humidPost.remove({ _id : req.params.postId});
        res.json(removePost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;