import type { UpdatePelanggaranFormValues } from "../schemas/pelanggaran.schema"
import type { PelanggaranType } from "../../../types/variable.type"
import type { FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form"
import type { OptionProps } from "../../../types/input.types"
import type { AddPelanggaranFormValues } from "../schemas/pelanggaran.schema"

export type UpdatePelanggaranPayload = {
  id: number
  data: UpdatePelanggaranFormValues
}

export type ListPelanggaranComponentProps = {
  isLoadingPelanggaran: boolean,
  pelanggaran: PelanggaranType['pelanggaran']
}

export type EditPelanggaranComponentProps = {
  pelanggaran: PelanggaranType['pelanggaran']
  editId: number | null
  setEditId: React.Dispatch<React.SetStateAction<number | null>>
  register: UseFormRegister<any>;
  isPending: boolean,
  setValue: UseFormSetValue<UpdatePelanggaranFormValues>
  errors: FieldErrors<UpdatePelanggaranFormValues>
} & React.InputHTMLAttributes<HTMLInputElement>

export type FilterSectionProps = {
  isLoading: boolean;
  options: OptionProps['selectOption']
  register: UseFormRegister<any>;
};

export type TambahPelanggaranProps = {
  options: OptionProps['selectOption']
  reset: UseFormReset<AddPelanggaranFormValues>
  fields: FieldArrayWithId<AddPelanggaranFormValues, "pelanggaran">[]
  remove: UseFieldArrayRemove
  register: UseFormRegister<any>
  handleSubmit: UseFormHandleSubmit<AddPelanggaranFormValues>
  errors: FieldErrors<AddPelanggaranFormValues>
}