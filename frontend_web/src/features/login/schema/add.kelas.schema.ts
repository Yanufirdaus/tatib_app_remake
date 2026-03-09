import { z } from "zod";

export const AddManyKelasSchema = z.object({
  kelas: z.array(
    z.object({
      name: z.string().min(1, { message: "Nama kelas is required" }),
      grade: z.string().refine(
            (val) => ["10", "11", "12"].includes(val),
            { message: "Grade harus 10, 11, atau 12" }
        )
    })
  )
})

export type AddKelasFormValues = z.infer<typeof AddManyKelasSchema>