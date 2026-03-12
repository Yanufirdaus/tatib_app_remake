import z from "zod";

export const UpdatePelanggaranSchema = z.object({
    pelanggaran: z.string().min(1, { message: "Pelanggaran is required" }),
    poin: z.string().min(1, { message: "Poin Pelanggaran is required" }),
});

export type UpdatePelanggaranFormValues = z.infer<typeof UpdatePelanggaranSchema>

export const AddPelanggaranSchema = z.object({
    pelanggaran: z.array(z.object({
        jenisId: z.string().min(1, { message: "Jenis ID is required" }),
        pelanggaran: z.string().min(1, { message: "Pelanggaran is required" }),
        poin: z.string().min(1, { message: "Poin Pelanggaran is required" }),
        nomor: z.string().min(1, { message: "Nomor Pelanggaran is required" }),
    }))
});

export type AddPelanggaranFormValues = z.infer<typeof AddPelanggaranSchema>