const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const ecPost = require('../models/ec-post'); 

//Get all the data
router.get("/", async (req,res) => {
    try {
        const ec1 = await ecPost.find();
        res.json(ec1);
    } catch (error) {
        res.json({message: err});
    }
});

//get a specific data
router.get("/:postId", async (req,res) => {
    try {
        const ec2 = await ecPost.findById(req.params.postId);
        res.json(ec2);
    } catch (error) {
        res.json({message: err});
    }
});

//save a post
router.post('/', async (req,res) => {
    const ec = new ecPost({
        e : req.body.e,
    });

    try {
        const savedPost = await ec.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//Update a specific post
router.patch("/:postId", async (req,res) => {
    try {
        const updatePost = await ecPost.updateOne(
            { _id : req.params.postId },
            {
                $set : {
                    e : req.body.e,
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
        const removePost = await ecPost.remove({ _id : req.params.postId});
        res.json(removePost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;