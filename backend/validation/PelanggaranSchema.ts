import { z } from "zod";

export const AddPelanggaranSchema = z.array(z.object({
    jenisId: z.coerce.number({ message: "Jenis ID must be a number" }).min(1, { message: "Jenis ID is required" }),
    pelanggaran: z.string().min(1, { message: "Pelanggaran is required" }),
    poin: z.coerce.number({ message: "Poin must be a number" }).min(0, { message: "Poin Pelanggaran is required" }),
}));

export const UpdatePelanggaranSchema = z.object({
    pelanggaran: z.string().min(1, { message: "Pelanggaran is required" }),
    poin: z.coerce.number({ message: "Poin must be a number" }).min(0, { message: "Poin Pelanggaran is required" }),
});