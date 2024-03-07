import express from "express";
import {
  authRegister,
  authLogin,
  authLogout,
  authCurrent,
} from "../controllers/userControllers.js";
import tokenAuth from "../helpers/tokenAuth.js";



const authRouter = express.Router();

authRouter.post("/register", authRegister);

authRouter.post("/login", authLogin);

authRouter.get("/logout", tokenAuth, authLogout);

authRouter.get("/current", tokenAuth, authCurrent);


export default authRouter;