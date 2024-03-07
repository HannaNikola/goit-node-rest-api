import userSchema from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authRegister = async(req, res, next) => {
    const { password, email } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        const user = await userSchema.findOne({ email: normalizedEmail });
        if (user !== null) {
            return res.status(409).send({ message: "Email in use" });
        }
        const passwordHash = await bcrypt.hash(password, 10); 
        const data = await userSchema.create({
          password: passwordHash,
          email: normalizedEmail,
        });
    
        res.status(201).send({ message: "Registration successful" });
    }
    catch (error) {
        next(error)
     }
   
};


export const authLogin = async (req, res, next) => {
    const { password, email } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        const user = await userSchema.findOne({ email: normalizedEmail });
        if (user === null) {
            return res.status(401).send({ message: "Not authorized" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch === false) {
            
            return res.status(401).send({ message: "Not authorized" });
        }

        const token = jwt.sign(
          {
            id: user._id,
          },
            process.env.JWT_SECRET,
          // {expiresIn:"1h"}
      );
      
     await User.findByIdAndUpdate(user._id, { token });
        res.send({ token });
        
    }
    catch (error) {
        next(error);
     }
}

export const authLogout = async(req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}




export const authCurrent = async (req, res) => {
  const { email } = req.user;
  

  res.json({email});
}




