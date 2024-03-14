import * as fs from "node:fs/promises";
import * as path from "node:path";
import User from "../models/user.js";
import Jimp from "jimp";

export const uploadAvatar = async (req, res, next) => {
    try {
        await fs.rename(
            req.file.path, path.join(process.cwd(), "public/avatars", req.file.filename));
        const image = await Jimp.read(req.file.path);
        await image.resize(250, 250);
        await image.writeAsync(req.file.path);



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

// export const uploadAvatar = async (req, res, next) => {
//     try {
        
//        const resultUpload = await fs.rename(
//          req.file.path,
//          path.join(process.cwd(), "public/avatars", req.file.filename)
//        );
//         const image = await Jimp.read(resultUpload);
//         await image.resize(250, 250);
//         await image.writeAsync(resultUpload);



//         const user = await User.findOneAndUpdate(
//         req.user._id,
//         { avatar: req.file.filename},
//         { new: true }
//     );
//     if (user === null) {
//         return res.status(404).send({massage: "User not found"})
//     }
//         res.send(user);
//     } catch (error) {
//         next(error);
//     }

// };

