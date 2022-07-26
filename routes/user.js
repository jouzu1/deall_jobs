const router = require("express").Router();

const User = require('../models/user');
const { route } = require("./auth");

const {verifyToken, verifyAdmin} = require("./verifyToken");


//Admin and User can access this endpoint
router.get("/get",verifyToken, async (req, res) => {
    try {
        const getUsers = await User.find();
        res.status(200).send(getUsers)
    } catch (error) {
        res.status(500).send({message : error});
        console.log(error);
    }
})


//Admin and user can access this endpoint (by username)
router.post("/get/user", verifyToken, async (req, res) => {
    const findByUsername = await User.find({username : req.body.username});
    let user = {};
    try {
        findByUsername.map(x => user = x);
        const {password, ...getUser} = user._doc;
        res.status(200).send(getUser);
    } catch (error) {
        res.status(500).send({message : error});
        console.log(error);
    }
})

//Only Admin can access update action
router.put("/update/:username", verifyAdmin, async (req, res) => {
    try {
        let updateUser = await User.findOneAndUpdate(req.params.username, req.body, {new:true});
        res.status(201).send(updateUser);
    } catch (error) {
        res.status(500).send({message : error});
        console.log(error);
    }
})

//Only Admin can access delete action
router.delete("/delete", verifyAdmin, async (req,res) => {
    try {
        await User.deleteOne({username : req.body.username});
        res.status(200).send({message : "Delete successfully"});
    } catch (error) {
        res.status(500).send({message : error});
        console.log(error);
    }
})


//Only Admin can access create action
router.post("/create", verifyAdmin, async (req, res) => {
    try {
        const initUser = new User(req.body);
        const createUser = await initUser.save();
        res.status(201).send({message : "New user created successfully", data : createUser})
    } catch (error) {
        res.status(500).send({message : error});
        console.log(error);
    }
})

module.exports = router;