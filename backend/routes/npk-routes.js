const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const npkPost = require('../models/npk-Post'); 

//Get all the npk data
router.get("/npk", async (req,res) => {
    try {
        const npk1 = await npkPost.find();
        res.json(npk1);
    } catch (error) {
        res.json({message: err});
    }
});

//get a specific data
router.get("/:postId", async (req,res) => {
    try {
        const npk2 = await npkPost.findById(req.params.postId);
        res.json(npk2);
    } catch (error) {
        res.json({message: err});
    }
});

// //save a data 
// router.post('/', (req,res) => {
//     const npk = new npkPost({
//         n : req.body.n,
//         p : req.body.p,
//         k : req.body.k,
//     });

//     npk.save().then((data) => {
//         res.json(data);
//     }).catch((err) => {
//         res.json({message: err });
//     });
// });

router.post('/', async (req,res) => {
    const npk = new npkPost({
        n : req.body.n,
        p : req.body.p,
        k : req.body.k,
    });

    try {
        const savedPost = await npk.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//Update a specific post
router.patch("/:postId", async (req,res) => {
    try {
        const updatePost = await npkPost.updateOne(
            { _id : req.params.postId },
            {
                $set : {
                n : req.body.n,
                p : req.body.p,
                k : req.body.k,
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
        const removePost = await npkPost.remove({ _id : req.params.postId});
        res.json(removePost);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;