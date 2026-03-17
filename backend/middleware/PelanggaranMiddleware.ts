import { z } from "zod";
import { AddPelanggaranSchema, UpdatePelanggaranSchema } from "../validation/PelanggaranSchema";
import { validate } from "./validator";

export const validatePelanggaranInputMiddleware = validate(z.object({
    pelanggaran: AddPelanggaranSchema
}));

export const validateUpdatePelanggaranMiddleware = validate(UpdatePelanggaranSchema);