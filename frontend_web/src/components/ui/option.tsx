import React from "react";
import type { OptionProps } from "../../types/input.types";

const SelectOption = React.forwardRef<HTMLSelectElement, OptionProps>(
    ({ selectOption, label, placeholder, className = "", ...props }, ref) => {
        return (
            <label className="text-xs md:text-base w-full">
                {label}
                <select
                    ref={ref}
                    {...props}
                    className={`border p-1 rounded-md focus:outline-none focus:ring-0 text-xs md:text-sm ${className}`}
                >
                    {placeholder && (
                        <option value="" disabled hidden>
                            {placeholder}
                        </option>
                    )}
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