import React from "react"
import type { InputProps } from "@/types/input.types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", labelClassName = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>

        {label && (
          <label htmlFor={props.id} className={`text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 ${labelClassName}`}>
            {label}
          </label>
        )}

        <div className="relative">

          <input
            ref={ref}
            {...props}
            className={`bg-white border p-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full text-sm transition-all ${
              error ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500/50"
            } ${icon ? "pr-12" : ""}`}
          />

          {icon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              {icon}
            </div>
          )}

        </div>

        {error && (
          <span className="text-[10px] text-red-500 font-medium px-1 animate-fade-in">
            {error}
          </span>
        )}

      </div>
    )
  }
)

Input.displayName = "Input"

export default Input;

