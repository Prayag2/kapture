import React from "react";

const Table = ({ data }) => {
  return (
    <table className="capitalize text-left">
      <tbody>
        {Object.keys(data).map((key, index) => (
          <tr key={`tableRow${index}`}>
            <th
              className="py-2 pr-5 block font-display"
              key={`tableHeading${index}`}
            >
              {key.replaceAll("_", " ")}
            </th>
            <td>{data[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
