import React from "react"
import type { PelanggaranType } from "./variable.type"
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import type { UpdatePelanggaranFormValues } from "../features/pelanggaran/schemas/pelanggaran.schema"

export type InputProps = {
  label?: string
  error?: string
  icon?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

export type OptionProps = {
  selectOption: {
    value: string
    label: string
  }[]
  label?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

export type ListPelanggaranComponentProps = {
  isLoadingPelanggaran: boolean,
  pelanggaran: PelanggaranType['pelanggaran']
}

export type EditPelanggaranComponentProps = {
  pelanggaran: PelanggaranType['pelanggaran']
  editId: number | null
  setEditId: React.Dispatch<React.SetStateAction<number | null>>
  register: UseFormRegister<any>;
  isPending:boolean,
  setValue: UseFormSetValue<UpdatePelanggaranFormValues>
  errors: FieldErrors<UpdatePelanggaranFormValues>
} & React.InputHTMLAttributes<HTMLInputElement>

export type FilterSectionProps = {
  isLoading: boolean;
  options: OptionProps['selectOption']
  register: UseFormRegister<any>;
};
