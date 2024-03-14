import express from "express";
import {
  authRegister,
  authLogin,
  authLogout,
  authCurrent,
} from "../controllers/userControllers.js";
import tokenAuth from "../helpers/tokenAuth.js";

import {uploadAvatar} from "../controllers/avatarControllers.js";
import upload from "../helpers/upload.js";



const authRouter = express.Router();

authRouter.post("/register", authRegister);

authRouter.post("/login", authLogin);

authRouter.get("/logout", tokenAuth, authLogout);

authRouter.get("/current", tokenAuth, authCurrent);

authRouter.patch( "/avatars", tokenAuth, upload.single("avatar"), uploadAvatar);


export default authRouter;