

import * as fs from "node:fs/promises";
import * as path from "node:path";
import User from "../models/user.js";
import Jimp from "jimp";

export const uploadAvatar = async (req, res, next) => {
  try {
    
    const image = await Jimp.read(req.file.path);

    await image.resize(250, 250);

    
    const tempPath = path.join(
      process.cwd(),
      "public",
      "avatars",
      req.file.filename
    );
    await image.writeAsync(tempPath);

  
    await fs.rename(req.file.path, tempPath);

    
    const user = await User.findOneAndUpdate(
      req.user.id,
      { avatar: req.file.filename },
      { new: true }
    );

   
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    
    res.send(user);
  } catch (error) {
    next(error);
  }
};