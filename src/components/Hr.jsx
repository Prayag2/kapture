import React from "react";

const Hr = ({ mt, mb, compact }) => {
  const marginBottom = compact ? "mb-5" : "mb-10";
  const marginTop = compact ? "mt-5" : "mt-10";
  return (
    <hr
      className={`${compact ? "w-1/2" : "w-full"} max-w-[30rem] mx-auto ${
        mt ? marginTop : ""
      } ${mb ? marginBottom : ""} border-accent opacity-75`}
    />
  );
};

Hr.defaultProps = {
  mt: true,
  mb: true,
  compact: false,
};

export default Hr;
