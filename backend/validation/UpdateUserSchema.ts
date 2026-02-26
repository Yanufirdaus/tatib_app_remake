import { z } from "zod";
import { Messages } from "../constant/message";

export const UpdateUserSchema = z.object({
    name: z.string().min(1, { message: Messages.NAME_REQUIRED }),
    kelasId: z.coerce.number( {message: "Kelas ID must be a number"} ).min(1, { message: Messages.KELASID_REQUIRED }),
    image_profile: z.string().nullable(),
})

export const UpdateTendikSchema = z.object({
    name: z.string().min(1, { message: Messages.NAME_REQUIRED }),
    image_profile: z.string().nullable(),
})