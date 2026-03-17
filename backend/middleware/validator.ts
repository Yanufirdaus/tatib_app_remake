import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export const validate = (schema: ZodTypeAny, property: "body" | "query" | "params" = "body") => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req[property]);

    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => {
        const path = issue.path.join('.');
        return path ? `${path}: ${issue.message}` : issue.message;
      }).join(', ');

      throw new AppError(errorMessages, 400);
    }

    req[property] = result.data;
    next();
  });
};
