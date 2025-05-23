import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).end();
    return;
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

    req.user_id = sub;

    next();
  } catch (err) {
    res.status(401).end();
  }
}
