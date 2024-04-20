import express from "express"
import  userRouter from "./routes/user.route.js"
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
app.use("/api/user",userRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

