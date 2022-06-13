import { ButtonHTMLAttributes, FC } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<any> {}

export const Button: FC<ButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <button
      className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      {...buttonProps}
    >
      {children}
    </button>
  );
};
