import Wrapper from "/src/components/Wrapper";
import Title from "/src/components/Title";
import React from "react";

const Section = ({ title, children, center }) => {
  return (
    <section className={`mt-12 ${center && "text-center"}`}>
        <Title>{title}</Title>
        {children}
    </section>
  );
};

export default Section;
