import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div className={`px-5 md:px-10 lg:px-20 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
