import React from "react";

const SimpleButton = (props: { children: string; fn: () => void }) => {
  const { children, fn } = props;
  return (
    <button
      onClick={fn}
      className="mb-2 me-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-d-din text-2xl font-medium uppercase text-gray-900 hover:bg-gray-100 focus:outline-none"
    >
      {children}
    </button>
  );
};

export default SimpleButton;
