import React from "react";

const Title = ({ children, className }) => {
  return (
    <h2 className={`text-xl md:text-2xl font-bold font-display mb-8 ${className}`}>
      {children}
    </h2>
  );
};

export default Title;
