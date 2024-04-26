import express from "express"
import { deleteUser, signout, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router=express.Router();

router.get("/",test)

router.put('/update/:id',verifyToken,updateUser)

router.delete('/delete/:id',verifyToken,deleteUser)

router.get("/signout",signout)






export default router;