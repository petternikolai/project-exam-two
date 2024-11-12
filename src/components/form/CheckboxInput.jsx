import React from "react";

export default function CheckboxInput({ id, name, label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
      />
      <label htmlFor={id} className="ml-2 block text-sm/6 text-gray-900">
        {label}
      </label>
    </div>
  );
}
