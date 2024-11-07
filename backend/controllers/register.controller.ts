import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../model/User";

export const handleNewUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { user, pwd } = req.body;
  console.log(req.body);

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err: any) {
    res.status(500).json({ message: err?.message });
  }
};
