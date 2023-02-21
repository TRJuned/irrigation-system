const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const phPost = require('../models/ph-post'); 

//Get all the data
router.get("/", async (req,res) => {
    try {
        const ph1 = await phPost.find();
        res.json(ph1);
    } catch (error) {
        res.json({message: err});
    }
});

//get a specific data
router.get("/:postId", async (req,res) => {
    try {
        const ph2 = await phPost.findById(req.params.postId);
        res.json(ph2);
    } catch (error) {
        res.json({message: err});
    }
});

//save a post
// router.post('/', (req,res) => {
//     const ph = new phPost({
//         ph1 : req.body.ph1,
//     });

//     ph.save().then((data) => {
//         res.json(data);
//     }).catch((err) => {
//         res.json({message: err })
//     });
// });

router.post('/', async (req,res) => {
    const ph = new phPost({
        ph1 : req.body.ph1,
    });

    try {
        const savedPost = await ph.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//Update a specific post
router.patch("/:postId", async (req,res) => {
    try {
        const updatePost = await phPost.updateOne(
            { _id : req.params.postId },
            {
                $set : {
                    ph1 : req.body.ph1,
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
        const removePost = await phPost.remove({ _id : req.params.postId});
        res.json(removePost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;