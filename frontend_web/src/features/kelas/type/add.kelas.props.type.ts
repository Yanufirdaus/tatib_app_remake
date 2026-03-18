import type { FieldArrayWithId, FieldErrors, UseFormRegister } from "react-hook-form"
import type { AddKelasFormValues } from "@/features/kelas/schemas/add.kelas.schema";

export type AddKelasProps = {
  fields: FieldArrayWithId<AddKelasFormValues>[]
  register: UseFormRegister<AddKelasFormValues>
  cancelAddHandler: () => void
  onSubmit: React.FormEventHandler<HTMLFormElement>
  isPendingAddKelas: boolean
  errors: FieldErrors<AddKelasFormValues>
}