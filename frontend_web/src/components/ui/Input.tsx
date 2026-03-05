import React from "react"
import type { InputProps } from "../../types/input.types"

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-4 w-full">

        {label && (
          <label htmlFor={props.id} className="text-sm">
            {label}
          </label>
        )}

        <div className="relative">

          <input
            ref={ref}
            {...props}
            className={`border p-2 rounded-md focus:outline-none focus:ring-0 w-full ${
              error ? "border-red-500" : ""
            } ${icon ? "pr-10" : ""}
            ${className}`}
          />

          {icon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {icon}
            </div>
          )}

        </div>

        {error && (
          <span className="text-red-500 text-sm">
            {error}
          </span>
        )}

      </div>
    )
  }
)

Input.displayName = "Input"

export default Input;

