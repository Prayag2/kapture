import React from "react";

const Section = ({ title, children }) => {
  return (
    <div className="rounded-md border-2 border-solid border-primary p-5 relative mb-5 space-y-3">
      <h1 className="inline-block text-lg font-bold absolute bg-background top-[-1rem] px-2 uppercase">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default Section;
