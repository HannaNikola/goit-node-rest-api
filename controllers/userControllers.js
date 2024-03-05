import userSchema from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authRegister = async(req, res, next) => {
    const { password, email } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        const user = await userSchema.findOne({ email: normalizedEmail });
        if (user !== null) {
            return res.status(409).send({ message: "User already registration" });
        }
        const passwordHash = await bcrypt.hash(password, 10); 
        const data = await userSchema.create({
          password: passwordHash,
          email: normalizedEmail,
        });
    // console.log(data);
        res.status(201).send({ message: "Registration successful" });
    }
    catch (error) {
        next(error)
     }
   
};


export const authLogin = async (req, res, next) => {
    const { password, email } = req.body;
    const normalizedEmail = email;

    try {
        const user = await userSchema.findOne({ email: normalizedEmail });
        if (user === null) {
            return res.status(401).send({message: 'email or password is incorrect'})
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (isMatch === false) {
            console.log("Password")
            return res
              .status(401)
              .send({ message: "email or password is incorrect" });
        }

        const token = jwt.sign(
          {
            id: user._id,
          },
            process.env.JWT_SECRET,
          // {expiresIn:"1h"}
        );
        res.send({ token });
        
    }
    
    
    catch (error) {
        next(error);
     }
}