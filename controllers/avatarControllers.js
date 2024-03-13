import * as fs from "node:fs/promises";
import * as path from "node:path";
import User from "../models/user.js";

export const uploadAvatar = async (req, res, next) => {
    try {
        await fs.rename(
        req.file.path, path.join(process.cwd(), "public/avatars", req.file.filename))
        
        const user = await User.findOneAndUpdate(
        req.user.id,
        { avatar: req.file.filename},
        { new: true }
    );
    if (user === null) {
        return res.status(404).send({massage: "User not found"})
    }
        res.send(user);
    } catch (error) {
        next(error);
    }

    
}