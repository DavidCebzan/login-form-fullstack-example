import User from "../model/User";
import { Response, Request } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const users = await User.find().select("-password -refreshToken");
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};
