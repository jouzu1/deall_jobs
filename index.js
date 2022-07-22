const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth");

dotenv.config();

app.listen(5000,() => {
    console.log('Server running on port', 5000);
})

mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("Application connected successfully"))
.catch(err => console.error(err));

//Router
app.use(express.json());
app.use("/user",userRoute);
app.use("/register",authRoute);