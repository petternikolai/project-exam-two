import React from "react";

/**
 * CheckboxInput renders a customizable checkbox input with a label.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique ID for the checkbox input.
 * @param {string} props.name - The name attribute for the checkbox input.
 * @param {string} props.label - The text label displayed alongside the checkbox.
 * @param {boolean} props.checked - Indicates whether the checkbox is checked.
 * @param {Function} props.onChange - Callback function triggered when the checkbox value changes.
 *
 * @returns {JSX.Element} A styled checkbox input component with a label.
 */
export default function CheckboxInput({ id, name, label, checked, onChange }) {
  return (
    <div className="flex items-center">
      {/* Checkbox input */}
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
      />
      {/* Associated label */}
      <label htmlFor={id} className="ml-2 block text-sm/6 text-gray-900">
        {label}
      </label>
    </div>
  );
}
