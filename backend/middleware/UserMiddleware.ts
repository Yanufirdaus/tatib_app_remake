import { UpdateManySiswaKelasSchema, UpdateTendikSchema, UpdateUserSchema } from "../validation/UpdateUserSchema";
import { validate } from "./validator";

export const UpdateSiswaInputCheckingMiddleware = validate(UpdateUserSchema);
export const UpdateManySiswaKelasInputCheckingMiddleware = validate(UpdateManySiswaKelasSchema);
export const UpdateTendikInputCheckingMiddleware = validate(UpdateTendikSchema);