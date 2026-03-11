import z from "zod";

export const UpdatePelanggaranSchema = z.object({
    pelanggaran: z.string().min(1, { message: "Pelanggaran is required" }),
    poin: z.string().min(1, { message: "Poin Pelanggaran is required" }),
});

export type UpdatePelanggaranFormValues = z.infer<typeof UpdatePelanggaranSchema>