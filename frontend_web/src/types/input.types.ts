import React from "react"

export interface DataCardProps {
  text: string;
  actionIcon: React.ReactNode;
  onActionClick?: () => void;
  isActionDisabled?: boolean;
  onCardClick?: () => void;
}

export type InputProps = {
  label?: string
  error?: string
  icon?: React.ReactNode
  labelClassName?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export type OptionProps = {
  selectOption: {
    value: string
    label: string
  }[]
  label?: string
  placeholder?: string
  error?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>
