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
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 p-2 bg-black text-white text-sm rounded-md shadow-lg z-10">
          <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-3 h-3 bg-black rotate-45"></div>
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
