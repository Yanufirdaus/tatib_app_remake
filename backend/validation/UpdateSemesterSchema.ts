import { z } from "zod";

export const UpdateSemesterSchema = z.object({
    semester: z.enum(["ganjil", "genap"], { message: "Semester must be either 'ganjil' or 'genap'" }),
    tahun_ajaran: z.string()
                .min(1, { message: "Tahun Ajaran is required" })
                .regex(/^\d{4}-\d{4}$/, {
                    message: "Format Tahun Ajaran harus seperti 2024-2025"
                })
});