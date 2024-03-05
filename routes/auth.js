import express from "express";
import { authRegister, authLogin } from "../controllers/userControllers.js";
import tokenAuth from "../helpers/tokenAuth.js";


const authRouter = express.Router();
// const jsonParser = express.json();
// authRouter.post("/users/register", jsonParser, authRegister);


authRouter.post("/register", authRegister);

authRouter.post("/login", authLogin);
export default authRouter;