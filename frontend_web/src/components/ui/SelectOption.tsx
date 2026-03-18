import React from "react";
import type { OptionProps } from "@/types/input.types";

const SelectOption = React.forwardRef<HTMLSelectElement, OptionProps>(
    ({ selectOption, label, placeholder, className = "", error, ...props }, ref) => {
        return (
            <div className={`flex flex-col w-full gap-1.5 ${className}`}>
                {label && (
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    {...props}
                    className={`bg-white border p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-all ${
                        error ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500/50"
                    }`}
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
                {error && <span className="text-[10px] text-red-500 font-medium px-1 animate-fade-in">{error}</span>}
            </div>
        )
    }
)

SelectOption.displayName = "SelectOption"

export default SelectOption;