import express from "express";
import {uploadAvatar} from "../controllers/avatarControllers.js";
import tokenAuth from "../helpers/tokenAuth.js";
import upload from "../helpers/upload.js";

const avatarRouter = express.Router();


avatarRouter.patch("/avatar", tokenAuth, upload.single("avatar"), uploadAvatar);



export default avatarRouter;