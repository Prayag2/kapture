import React from "react";

const Hr = ({ mt, mb }) => {
  return (
    <hr
      className={`w-full max-w-[30rem] mx-auto ${mt ? "mt-10" : ""} ${
        mb ? "mb-10" : ""
      } border-primary`}
    />
  );
};

Hr.defaultProps = {
  mt: true,
  mb: true,
};

export default Hr;
