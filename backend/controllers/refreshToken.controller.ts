import { Response, Request } from "express";
import User from "../model/User";
import jwt, { VerifyErrors } from "jsonwebtoken";
import EnvConfig from "../config/envConfig";

export const handleRefreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    EnvConfig.REFRESH_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles: roles,
          },
        },
        EnvConfig.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      res.json({ roles, accessToken });
    }
  );
};
