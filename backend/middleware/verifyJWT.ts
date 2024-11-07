import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import EnvConfig from "../config/envConfig";

export const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  //forbidden
  if (!authHeader) return res.sendStatus(401);

  if (typeof authHeader === "string" && !authHeader?.startsWith("Bearer "))
    return res.sendStatus(401);
  // typescript
  if (!(typeof authHeader === "string")) return res.sendStatus(500);

  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, EnvConfig.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403); //invalid token
    // @ts-ignore
    req.user = decoded.UserInfo.username;
    // @ts-ignore
    req.roles = decoded.UserInfo.roles;
    next();
  });
};
