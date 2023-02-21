const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const tempPost = require('../models/temp-post'); 

//Get all the data
router.get("/", async (req,res) => {
    try {
        const temp2 = await tempPost.find();
        res.json(temp2);
    } catch (error) {
        res.json({message: err});
    }
});

//get a specific data
router.get("/:postId", async (req,res) => {
    try {
        const temp3 = await tempPost.findById(req.params.postId);
        res.json(temp3);
    } catch (error) {
        res.json({message: err});
    }
});

//save a post
router.post('/', async (req,res) => {
    const temp = new tempPost({
        temp1 : req.body.temp1,
    });

    try {
        const savedPost = await temp.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//Update a specific post
router.patch("/:postId", async (req,res) => {
    try {
        const updatePost = await tempPost.updateOne(
            { _id : req.params.postId },
            {
                $set : {
                    temp1 : req.body.temp1,
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
        const removePost = await tempPost.remove({ _id : req.params.postId});
        res.json(removePost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;