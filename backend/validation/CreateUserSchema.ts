import { z } from "zod";
import { Messages } from "../constant/message";

export const CreateUserSchema = z.object({
    name: z.string().min(1, { message: Messages.NAME_REQUIRED }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    role: z.enum(["siswa"], { message: "Role not valid'" }),
    image_profile: z.string().nullable(),
    kelasId: z.coerce.number( {message: "Kelas ID must be a number"} ).min(1, { message: Messages.KELASID_REQUIRED }),
    nisn: z.string( Messages.NISN_REQUIRED ).min(6, { message: "NISN Minimal 6 digit" }),
    poin: z.coerce.number({message: "Kelas ID must be a number"}),
});

export const CreateTendikSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["admin", "kesiswaan", "bk", "kepsek"], { message: "Role not valid'" }),
    image_profile: z.string().nullable(),
    nip: z.string( Messages.NIP_REQUIRED ).min(6, { message: "NIP Minimal 6 digit" }),
});

