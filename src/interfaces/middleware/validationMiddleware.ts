import { Request, Response, NextFunction, RequestHandler } from "express";
import { body, validationResult } from "express-validator";

export const validateCreateOrder: RequestHandler[] = [
  body("userId")
    .notEmpty()
    .withMessage("userId is required") as unknown as RequestHandler,

  body("items")
    .isArray({ min: 1 })
    .withMessage(
      "items must be a non-empty array"
    ) as unknown as RequestHandler,

  body("items.*.productId")
    .notEmpty()
    .withMessage(
      "Each item must have a productId"
    ) as unknown as RequestHandler,

  body("items.*.quantity")
    .isInt({ gt: 0 })
    .withMessage(
      "Each item must have a quantity greater than 0"
    ) as unknown as RequestHandler,

  // Custom middleware to handle validation results
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
