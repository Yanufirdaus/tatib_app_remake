import { UpdateSemesterSchema } from "../validation/UpdateSemesterSchema";
import { validate } from "./validator";

export const UpdateSemesterMiddleware = validate(UpdateSemesterSchema);

// Alias for backward compatibility
export const UpdateSemesterMidleware = UpdateSemesterMiddleware;