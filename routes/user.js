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

//Only Admin can access update permissions
router.put("/update/:username", verifyAdmin, async (req, res) => {
    try {
        let updateUser = await User.findOneAndUpdate(req.params.username, req.body, {new:true});
        res.status(201).send(updateUser);
    } catch (error) {
        res.status(500).send({message : error});
        console.log(error);
    }
})

module.exports = router;