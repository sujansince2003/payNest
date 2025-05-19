"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  amount: number;
  onClick: () => void;
}

export const Button = ({ onClick, amount, children }: ButtonProps) => {
  return (
    <button
      disabled={amount > 0 ? false : true}
      onClick={onClick}
      type="button"
      className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {children}
    </button>
  );
};
