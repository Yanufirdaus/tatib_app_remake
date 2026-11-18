import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
export const validate = (schema, property = "body") => {
    return catchAsync(async (req, res, next) => {
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
