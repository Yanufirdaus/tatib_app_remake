import React from "react";
import type { OptionProps } from "../../types/input.types";

const SelectOption = React.forwardRef<HTMLInputElement, OptionProps>(
  ({ selectOption, label, className = "", ...props }) => {
    return (
        <label className="text-xs md:text-base">
            {label}
            <select 
                {...props}
                className="border p-1 rounded-md focus:outline-none focus:ring-0 min-w-30 md:min-w-50 text-xs md:text-sm"
            >
                {selectOption.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </label>
    )
  }
)

SelectOption.displayName = "selectOption"

export default SelectOption;