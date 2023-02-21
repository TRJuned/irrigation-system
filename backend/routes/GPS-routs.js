const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const gpsPost = require('../models/gps-post'); 

//Get all the data
router.get("/", async (req,res) => {
    try {
        const gps1 = await gpsPost.find();
        res.json(gps1);
    } catch (error) {
        res.json({message: err});
    }
});

//get a specific data
router.get("/:postId", async (req,res) => {
    try {
        const gps2 = await gpsPost.findById(req.params.postId);
        res.json(gps2);
    } catch (error) {
        res.json({message: err});
    }
});

//save a post
router.post('/', async (req,res) => {
    const gps = new gpsPost({
            time : req.body.time,
            location : req.body.location
    });

    try {
        const savedPost = await gps.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//Update a specific post
router.patch("/:postId", async (req,res) => {
    try {
        const updatePost = await gpsPost.updateOne(
            { _id : req.params.postId },
            {
                $set : {
                    time : req.body.time,
                    location : req.body.location 
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
        const removePost = await gpsPost.remove({ _id : req.params.postId});
        res.json(removePost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;