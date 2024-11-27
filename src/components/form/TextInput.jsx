import React from "react";

/**
 * TextInput renders a styled text input field with an associated label.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique ID for the input field.
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.type - The type of input (e.g., "text", "email", "password").
 * @param {string} props.label - The text label displayed above the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - Callback function triggered when the input value changes.
 * @param {boolean} [props.required=false] - Indicates whether the input is required.
 * @param {string} [props.autoComplete] - The autoComplete attribute for the input field.
 *
 * @returns {JSX.Element} A styled input field with a label.
 */
export default function TextInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required = false,
  autoComplete,
}) {
  return (
    <div>
      {/* Input label */}
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        {/* Text input field */}
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm/6"
        />
      </div>
    </div>
  );
}
