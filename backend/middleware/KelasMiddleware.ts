import { AddKelasSchema, AddManyKelasSchema } from "../validation/KelasSchema";
import { validate } from "./validator";

export const CreateKelasMiddleware = validate(AddKelasSchema);
export const CreateManyKelasMiddleware = validate(AddManyKelasSchema);

// Aliases for backward compatibility
export const CreateKelasMidleware = CreateKelasMiddleware;
export const CreateManyKelasMidleware = CreateManyKelasMiddleware;