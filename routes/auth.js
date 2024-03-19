import express from "express";
import {
  authRegister,
  authLogin,
  authLogout,
  authCurrent,
  verifyUser,
  resendVerifyEmail,
} from "../controllers/userControllers.js";
import tokenAuth from "../helpers/tokenAuth.js";

import {uploadAvatar} from "../controllers/avatarControllers.js";
import upload from "../helpers/upload.js";
import {emailSchema} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";



const authRouter = express.Router();

authRouter.post("/register", authRegister);

authRouter.post("/login", authLogin);

authRouter.get("/logout", tokenAuth, authLogout);

authRouter.get("/current", tokenAuth, authCurrent);

authRouter.patch( "/avatars", tokenAuth, upload.single("avatar"), uploadAvatar);

authRouter.get("/verify/:verificationToken", verifyUser);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

export default authRouter;