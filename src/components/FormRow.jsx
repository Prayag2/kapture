import React from 'react';

const FormRow = ({children}) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 [&>*]:w-full justify-end items-end">
      {children}
    </div>
  );
};

export default FormRow;
