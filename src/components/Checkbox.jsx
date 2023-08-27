import { useState, useRef } from "react";

const Checkbox = ({ name, placeholder, value }) => {
  const [checked, setChecked] = useState(false);
  const checkboxEl = useRef();
  const toggleChecked = () => {
    setChecked((prev) => {
      checkboxEl.current.value = !prev;
      return !prev;
    });
  };

  return (
    <div
      onClick={toggleChecked}
      className="cursor-pointer inline-flex items-center gap-2"
    >
      <input
        className="hidden"
        name={name}
        id="check"
        type="checkbox"
        ref={checkboxEl}
      />
      <div
        className={`p-1 h-5 aspect-square rounded overflow-hidden ${
          checked ? "bg-accent" : "bg-secondary"
        }`}
      >
        <svg
          className={!checked ? "hidden" : undefined}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12.6111L8.92308 17.5L20 6.5"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-background"
          />
        </svg>
      </div>
      <p className="select-none">{placeholder}</p>
    </div>
  );
};

Checkbox.defaultProps = {
  placeholder: "Toggle Me",
  value: false,
};

export default Checkbox;
