import "dotenv/config";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAIL_TRAP_PASSWORD,
  },
});

 const message = {
     from: "h.nikolaienko32@gmail.com ", 
    to: "h.nikolaienko32@gmail.com", 
    subject: "Hello ", 
    text: "hello node.js", 
    html: "<h1>Hello world?</h1>", 
};



transport.sendMail(message)
.then(console.log)
.catch(console.error)