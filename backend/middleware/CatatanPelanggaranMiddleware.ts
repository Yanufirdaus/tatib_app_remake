import { AddCatatanPelanggaranSchema, AddManyCatatanPelanggaranSchema } from "../validation/CatatanPelanggaranSchema";
import { validate } from "./validator";

export const validateCatatanPelanggaranInputMiddleware = validate(AddCatatanPelanggaranSchema);
export const validateManyCatatanPelanggaranInputMiddleware = validate(AddManyCatatanPelanggaranSchema);