import { z } from "zod";
import { Messages } from "../constant/message";

export const LoginSchema = z.object({
    nomor_induk: z.string( Messages.NOMOR_INDUK_REQUIRED ).min(6, { message: "Nomor induk Minimal 6 digit" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" })
});