import type { UpdatePelanggaranFormValues } from "@/features/pelanggaran/schemas/pelanggaran.schema";
import type { Pelanggaran } from "@/types/models"
import type { FieldArrayWithId, FieldErrors, UseFieldArrayRemove, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form"
import type { OptionProps } from "@/types/input.types"
import type { AddPelanggaranFormValues } from "@/features/pelanggaran/schemas/pelanggaran.schema";

export type PelanggaranFilterForm = {
  jenisPelanggaran: string;
}

export type UpdatePelanggaranPayload = {
  id: number
  data: UpdatePelanggaranFormValues
}

export type ListPelanggaranComponentProps = {
  isLoadingPelanggaran: boolean,
  pelanggaran: Pelanggaran[]
}

export type EditPelanggaranComponentProps = {
  pelanggaran: Pelanggaran[]
  editId: number | null
  setEditId: React.Dispatch<React.SetStateAction<number | null>>
  register: UseFormRegister<UpdatePelanggaranFormValues>;
  isPending: boolean,
  setValue: UseFormSetValue<UpdatePelanggaranFormValues>
  errors: FieldErrors<UpdatePelanggaranFormValues>
  handleSubmit: UseFormHandleSubmit<UpdatePelanggaranFormValues>
  onSubmit: (data: UpdatePelanggaranFormValues) => void
}

export type FilterSectionProps = {
  isLoading: boolean;
  options: OptionProps['selectOption']
  register: UseFormRegister<PelanggaranFilterForm>;
};

export type TambahPelanggaranProps = {
  options: OptionProps['selectOption']
  reset: UseFormReset<AddPelanggaranFormValues>
  fields: FieldArrayWithId<AddPelanggaranFormValues, "pelanggaran">[]
  remove: UseFieldArrayRemove
  register: UseFormRegister<AddPelanggaranFormValues>
  handleSubmit: UseFormHandleSubmit<AddPelanggaranFormValues>
  errors: FieldErrors<AddPelanggaranFormValues>
}