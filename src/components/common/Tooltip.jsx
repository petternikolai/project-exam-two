import React, { useState } from "react";

export default function Tooltip({ content, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 p-2 bg-gray-700 text-white text-sm rounded-md shadow-lg z-10">
          {content}
        </div>
      )}
    </div>
  );
}
