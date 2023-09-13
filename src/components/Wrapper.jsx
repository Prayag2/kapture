import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div className={`px-8 md:px-10 lg:px-32 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
