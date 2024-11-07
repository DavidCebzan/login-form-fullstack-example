import { Request, Response, NextFunction } from "express";

const verifyRoles = (...allowedRoles: number[]): any => {
  return (
    req: Request & { roles?: number[] },
    res: Response,
    next: NextFunction
  ) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
