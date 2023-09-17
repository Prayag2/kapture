import React from 'react';

const NumberCard = ({title, value}) => {
  return (
    <div className="bg-secondary px-8 py-3 rounded-md shadow text-left inline-block m-2">
      <h3 className="font-display text-md">{title}</h3>
      <p className="font-display text-2xl font-bold">{value}</p>
    </div>
  );
};

export default NumberCard;
