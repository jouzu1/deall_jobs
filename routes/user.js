const router = require("express").Router();

router.get("/usertest",(req,res)=>{
    res.send("Test success")
})

module.exports = router;