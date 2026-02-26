import { z } from "zod";

export const AddKelasSchema = z.object({
    name: z.string().min(1, { message: "Nama kelas is required" }),
    grade: z.coerce.number({ message: "Grade must be a number" }).refine(val => [10,11,12].includes(val), { message: "Grade must be 10, 11, or 12" }),
});

export const AddManyKelasSchema = z.array(z.object({
    name: z.string().min(1, { message: "Nama kelas is required" }),
    grade: z.coerce.number({ message: "Grade must be a number" }).refine(val => [10,11,12].includes(val), { message: "Grade must be 10, 11, or 12" }),
}));