import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

function Button({
  type = "button",
  onClick,
  children,
  className = "",
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`rounded-full bg-gray-200 hover:bg-gray-300 transition p-2 flex items-center justify-center text-xl font-bold ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
