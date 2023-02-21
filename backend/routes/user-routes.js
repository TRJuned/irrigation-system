const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const userdb = require('../models/user-post');
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

 

//Get all the user data
router.get("/", async (req,res) => {
    try {
        const user1 = await userPost.find();
        res.json(user1);
    } catch (error) {
        res.json({message: err});
    }
});

//get a specific data
router.get("/:postId", async (req,res) => {
    try {
        const user2 = await userPost.findById(req.params.postId);
        res.json(user2);
    } catch (error) {
        res.json({message: err});
    }
});

//user registration
router.post('/register', async (req,res) => {
    const {fname,email,password,cpassword} = req.body;

    if(!fname || !email || !password || !cpassword){
        res.status(422).json({error:"fill all the details"})
    }

    try {
        
        const preuser = await userdb.findOne({email:email});

        if(preuser){
            res.status(422).json({error:"This Email is Already Exist"})
        }else if(password !== cpassword){
            res.status(422).json({error:"Password and Confirm Password Not Match"})
        }
        else{
            const finalUser = new userdb({
                fname,email,password,cpassword
            });

            const storeData =  finalUser.save();

            //console.log(storeData);
            res.status(201).json({status:201,storeData});
        }
    } catch (error) {
         res.status(422).json(error);
         console.log("catch block error");
    }
    // const user = new userPost({
    //     fname : req.body.fname,
    //     email : req.body.email,
    //     password : req.body.password,
    //     cpassword : req.body.cpassword
    // });

    // if (!fname || !email || !password || !cpassword){
    //     res.status(422).json({error:"fill all details"})
    // }

    // try {
    //     const savedPost = await user.findOne({email:email});

    //     if(savedPost){
    //         res.status(422).json({error:"This email already Exist"})
    //     }
    //     else if(password !== cpassword){
    //         res.status(422).json({error:"Password and Confirm Password Not Match"})
    //     }
    //     else
    //     res.json(savedPost);
    // } catch (err) {
    //     res.json({message: err});
    // }
});

// user login

router.post("/login",async(req,res)=> {
    //console.log(req.body);

    const {email,password} = req.body;

    if(!email || !password){
        res.status(422).json({error:"fill all the details"})
    }

    try {
        const userValid = await userdb.findOne({email:email});

        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({error:"invalid details"})
            }else{
                //token generate
                const token = await userValid.generateAuthtoken();

                //console.log(token);

                //cookie generate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result});
             }
        }
    } catch (error) {
          res.status(201).json(error);
          console.log("catch block");
    }

});


//user valid
router.get("/validuser",authenticate,async(req,res)=>{
    console.log("done");
})



//Update a specific post
router.patch("/:postId", async (req,res) => {
    try {
        const updatePost = await userPost.updateOne(
            { _id : req.params.postId },
            {
                $set : {
                    email : req.body.email,
                    password : req.body.password,
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
        const removePost = await userPost.remove({ _id : req.params.postId});
        res.json(removePost);
    } catch (err) {
        res.json({message: err});
    }
});



module.exports = router;