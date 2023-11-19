import React from "react";

const Accordian = ({ summary, children }) => {
  return (
    <details className="border-b first-of-type:border-t select-none group w-full">
      <summary className="p-2 font-display text-lg list-none cursor-pointer font-bold flex justify-between items-center">
        {summary}
        <span className="group-open:hidden">+</span>
        <span className="hidden group-open:inline">-</span>
      </summary>
      <div className="px-2 pb-2 text-md">{children}</div>
    </details>
  );
};

Accordian.defaultProps = {
  summary: "Click Me",
  children: "Lorem ipsum dolor sit amet.",
};

export default Accordian;
