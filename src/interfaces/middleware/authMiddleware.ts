import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
    return;
  }

  // Verify the token
  const token = authHeader.split(" ")[1];
  // For illustration, using a fixed token to be sent for testing
  if (token !== "ythRgvkbdjbvkjbkj.hvguhscvjhvhjcs.hvjuvcehgjv") {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }

  next();
};
