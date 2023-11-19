import React from 'react';

const FormRow = ({children, className}) => {
  return (
    <div className={`flex flex-col gap-5 [&>*]:w-full ${className}`}>
      {children}
    </div>
  );
};

export default FormRow;
