import type { UpdatePelanggaranFormValues } from "../schemas/pelanggaran.schema"

export type UpdatePelanggaranPayload = {
  id: number
  data: UpdatePelanggaranFormValues
}