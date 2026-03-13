import z from "zod";

export const CreateUserSchema = z.object({
    siswa: z.array(z.object({
        name: z.string().min(1, { message: "Nama is required" }),
        kelasId: z.string().min(1, { message: "Kelas ID is required" }),
        nisn: z.string("NISN is required").min(6, { message: "NISN Minimal 6 digit" }),
    }))
});

export type CreateUserFormValues = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z.object({
    name: z.string().min(1, { message: "Nama is required" }),
    kelasId: z.string().min(1, { message: "Kelas ID is required" }),
    nisn: z.string().min(6, { message: "NISN Minimal 6 digit" }),
})

export type UpdateUserFormValues = z.infer<typeof UpdateUserSchema>

export const UpdateManySiswaKelasSchema = z.object({
    kelasUpdate: z.array(z.object({
        siswaIds: z.string().min(1, { message: "Siswa ID must be at least 1" }),
        kelasIds: z.string().min(1, { message: "Kelas ID must be at least 1" }),
    }))
})

export type UpdateManySiswaKelasFormValues = z.infer<typeof UpdateManySiswaKelasSchema>
