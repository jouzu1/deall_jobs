const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const header = req.headers.token;
    if(header){
        const token = header;
        jwt.verify(token, process.env.JWT, (err,user)=>{
            if(err){
                res.status(403).send("Token is not valid, please Re-Login to receive new Token");   //Validasi dengan crosscheck antara secret key dari JWT hasil login dengan secret key  dari file .env
            }
            req.user = user;
            // console.log(req.user);
            next();
        })
    }else{
        return res.status(401).send("You are not authorized, please insert the Token");
    }
}

const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).send("Need Admin level to do such action");
        }
    })
}

module.exports = {verifyToken, verifyAdmin};