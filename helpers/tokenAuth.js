import jwt from "jsonwebtoken";

function tokenAuth(req, res, next) {
    const authHeader = req.headers.authorization;
 
    if (typeof authHeader === "undefined") {
        return res.status(401).send({message: "Invalid token"})
    }
    
    const [Bearer , token] = authHeader.split(" ", 2);
    if (Bearer !== "Bearer") {
         return res.status(401).send({ message: "Invalid token" });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
              return res.status(401).send({ message: "Token expired" });
            }
           return res.status(401).send({ message: "Invalid token" });
        }
        console.log(decode);
        req.owner = {
          id: decode.id,
        };

        next();
    });
    
}

export default tokenAuth;