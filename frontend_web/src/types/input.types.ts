import React from "react"

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