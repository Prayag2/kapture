import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className="w-[95%] md:w-[90%] lg:w-[85%] mx-auto">{children}</div>
  );
};

export default Wrapper;
