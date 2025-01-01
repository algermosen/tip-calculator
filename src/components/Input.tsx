import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  iconSrc?: string;
  slack?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  iconSrc,
  slack,
  ...props
}) => {
  return (
    <div>
      <div className="flex items-center">
        {label && (
          <label className="text-lg font-semibold text-gray-500 w-1/2">
            {label}
          </label>
        )}
        {errorMessage && (
          <span className="text-red-500 w-1/2 text-right">{errorMessage}</span>
        )}
      </div>
      <div className="flex gap-1 items-center bg-secondary-100 border border-transparent focus-within:border-primary px-3 font-bold text-xl">
        {iconSrc && <img src={iconSrc} alt="icon" className="w-5" />}
        <input
          type="number"
          {...props}
          className={`w-full py-2 bg-secondary-100 text-right ${!slack ? 'text-primary-dark' : 'text-secondary-light'} focus:outline-none`}
        />
      </div>
      <style>
        {`
        /* Hide the default number input spinner */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }
        `}
      </style>
    </div>
  );
};

export default Input;
