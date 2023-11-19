import React from "react";

const Hr = ({ mt, mb, compact }) => {
  const margins = compact ? 5 : 10;
  return (
    <hr
      className={`${compact ? "w-1/2" : "w-full"} max-w-[30rem] mx-auto ${mt ? "mt-" + margins : ""} ${
        mb ? "mb-" + margins : ""
      } border-accent opacity-75`}
    />
  );
};

Hr.defaultProps = {
  mt: true,
  mb: true,
  compact: false
};

export default Hr;
