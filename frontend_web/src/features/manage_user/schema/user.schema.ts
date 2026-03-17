import z from "zod";

export const CreateUserSchema = z.object({
    siswa: z.array(z.object({
        name: z.string().min(1, { message: "Nama is required" }),
        kelasId: z.string().min(1, { message: "Kelas ID is required" }),
        nisn: z.string("NISN is required").min(6, { message: "NISN Minimal 6 digit" }),
    }))
});

export type CreateUserFormValues = z.infer<typeof CreateUserSchema>

export const CreateTendikSchema = z.object({
    tendik: z.array(z.object({
        name: z.string().min(1, { message: "Name is required" }),
        role: z.enum(["admin", "kesiswaan", "bk", "kepsek"], { message: "Role not valid'" }),
        nip: z.string().min(6, { message: "NIP Minimal 6 digit" }),
    }))
});

export type TendikRole = "admin" | "kesiswaan" | "bk" | "kepsek";

export type CreateTendikFormValues = z.infer<typeof CreateTendikSchema>

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

export const UpdateTendikSchema = z.object({
    name: z.string().min(1, { message: "Nama is required" }),
    nip: z.string().min(1, { message: "NIP is required" }),
    role: z.string().min(1, { message: "Jabatan is required" }),
})

export type UpdateTendikFormValues = z.infer<typeof UpdateTendikSchema>
