const router = require("express").Router();

const User = require('../models/user');

const {verifyToken, verifyAdmin} = require("./verifyToken");

//READ_OPERATION
//Admin and User can access this endpoint
router.get("/get",verifyToken, async (req, res) => {
    try {
        const getUsers = await User.find();
        console.log(getUsers);
        res.status(200).send(getUsers)
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;