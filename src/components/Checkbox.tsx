import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

function Checkbox({ checked, onChange, className = "" }: CheckboxProps) {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-0"
      />
    </label>
  );
}

export default Checkbox;
