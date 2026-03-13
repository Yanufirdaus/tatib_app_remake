import { z } from "zod";
import { Messages } from "../constant/message";

export const UpdateUserSchema = z.object({
    name: z.string().min(1, { message: Messages.NAME_REQUIRED }),
    kelasId: z.coerce.number({ message: "Kelas ID must be a number" }).min(1, { message: Messages.KELASID_REQUIRED }),
    nisn: z.string().min(6, { message: "NISN Minimal 6 digit" }),
})

export const UpdateTendikSchema = z.object({
    name: z.string().min(1, { message: Messages.NAME_REQUIRED }),
    image_profile: z.string().nullable(),
})

// export const UpdateManySiswaKelasSchema = z.object({
//     siswaIds: z.array(z.coerce.number()).min(1, { message: "Siswa ID must be at least 1" }),
//     kelasIds: z.array(z.coerce.number()).min(1, { message: "Kelas ID must be at least 1" }),
// })

export const UpdateManySiswaKelasSchema = z.object({
    kelasUpdate: z.array(z.object({
        siswaIds: z.coerce.number().min(1, { message: "Siswa ID must be at least 1" }),
        kelasIds: z.coerce.number().min(1, { message: "Kelas ID must be at least 1" }),
    }))
})