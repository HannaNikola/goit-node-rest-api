import express from "express";
import { authRegister, authLogin } from "../controllers/userControllers.js";
import tokenAuth from "../helpers/tokenAuth.js";


const authRouter = express.Router();
// const jsonParser = express.json();
// authRouter.post("/users/register", jsonParser, authRegister);


authRouter.post("/register",tokenAuth, authRegister);

authRouter.post("/login",tokenAuth, authLogin);
export default authRouter;