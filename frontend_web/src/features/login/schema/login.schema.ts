import { z } from "zod";

export const LoginSchema = z.object({
    nomor_induk: z.string( "Nomor induk harus diisi" ).min(6, { message: "Nomor induk Minimal 6 digit" }).regex(/^[0-9]+$/, "NIP harus angka"),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;