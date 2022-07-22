const router = require("express").Router();
const User = require("../models/user");

//Register
router.post("/user",async (req,res)=>{
    const newUser = new User(req.body);
    try {
        if(req.body.isAdmin){
            await newUser.save();
            res.status(201).send({message : "New Admin is created successfully"});
        }
            await newUser.save();
            res.status(201).send({message : "New User is created successfully"});
    } catch (error) {
        res.status(409).send({message : error});
    }
})

module.exports = router;