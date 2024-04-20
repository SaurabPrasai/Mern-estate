import express from "express"
import  userRouter from "./routes/user.route.js"
import  authRouter from "./routes/auth.route.js"

import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const app=express();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
})




// middleware
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

