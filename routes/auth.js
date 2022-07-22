const router = require("express").Router();
const User = require("../models/user");

//Register
router.post("/register",async (req,res)=>{
    const newUser = new User(req.body);
    try {
        if(req.body.isAdmin){
            await newUser.save();
            res.status(201).send({message : "New Admin is created successfully", data : await newUser.save()});
        }
            await newUser.save();
            res.status(201).send({message : "New User is created successfully", data : await newUser.save()});
    } catch (error) {
        res.status(409).send({message : error});
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const findUser = await User.findOne({
            username : req.body.username
        })

        if(!findUser){
            res.status(404).send({message : "User not found"});
        }

        if(findUser.password != req.body.password){
            res.status(401).send({message : "Unauthorized"})
        }else{
        }
    } catch (error) {

    }
})

module.exports = router;