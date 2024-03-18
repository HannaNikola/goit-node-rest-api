import crypto from "node:crypto";
import userSchema from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import gravatar from "gravatar";
import nodemailer from "nodemailer";
import next from "next";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAIL_TRAP_PASSWORD,
  },
});

export const authRegister = async (req, res, next) => {
  const { password, email } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await userSchema.findOne({ email: normalizedEmail });
    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();
    // send email
    await transport.sendMail({
      from: "h.nikolaienko32@gmail.com ",
      to: "h.nikolaienko32@gmail.com",
      subject: "Welcome to Contacts",
      text: `Confirm your registration , please follow the link http://localhost:3000/api/users/verify/${verificationToken}`,
      html: `To confirm your registration <a a href="http://localhost:3000/api/users/verify/${verificationToken}">Link<?a>`,
    });

    


    const avatar = gravatar.url(email);
    const data = await userSchema.create({
      password: passwordHash,
      email: normalizedEmail,
      avatar,
      verificationToken,
    });

    res.status(201).send({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};



export const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await userSchema.findOne({
      verificationToken: verificationToken,
    });

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }
    await userSchema.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    
    res.status(200).send({ message: "Verification successful" });
   }
  catch (error) {
    next(error);
  }

};


export const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  try {

    const user = await userSchema.findOne({ email });

    if (user === null) {
      return res.status(400).send({ message: "missing required field email" });
    }
    if (user.verify) {
      return res.status(400).send({ message: "Verification has already been passed" });
    }
   
    await transport.sendMail({
      from: "h.nikolaienko32@gmail.com ",
      to: "h.nikolaienko32@gmail.com",
      subject: "Welcome to Contacts",
      text: ` You need to confirm your registration , please follow the link http://localhost:3000/api/users/verify/${user.verificationToken}`,
      html: `You need to confirm your registration <a a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click verify email<?a>`,
    });

    res.status(200).send({ message: "Verification email sent" });
  }
  
  catch (error) {
    next(error);
  }
}



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
    if (user.verify === false) {
      return res.status(401).send({ message: "User not verified" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
      // {expiresIn:"1h"}
    );

    await User.findByIdAndUpdate(user._id, { token });
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

export const authLogout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const authCurrent = async (req, res) => {
  const { _id, email, token } = req.user;

  res.json({
    _id,
    email,
    token,
  });
};
