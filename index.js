const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require("./routes/user.js");

dotenv.config();

app.listen(5000,() => {
    console.log('Server running on port', 5000);
})

mongoose
.connect(process.env.mongo_url)
.then(()=>console.log("Application connected successfully"))
.catch(err => console.error(err));

app.use("/user",userRoute);