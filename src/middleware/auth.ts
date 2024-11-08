import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

declare global {
  namespace Express {
    interface Request {
      userID?: string;
    }
  }
}

interface JwtPayload {
  user: {
    id: string;
    email: string;
  };
}

const validateToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];

      if (!token) {
        res
          .status(401)
          .json({ message: "User is not authorized or token is missing" });
        return;
      }

      try {
        const decoded = (await jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET as string
        )) as JwtPayload;

        req.userID = decoded.user.id;

        next();
      } catch (error) {
        res.status(401).json({ message: "Error verifying token" });
      }
    } else {
      res.status(401).json({ message: "No token provided or invalid token" });
    }
  }
);

export default validateToken;
