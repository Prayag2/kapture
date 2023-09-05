import { useState, useRef, useEffect } from "react";

const Select = ({
  name,
  placeholder,
  options,
  multiple,
  colour,
  icon,
  defaultValue,
  className,
  onChange,
  refEl,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(defaultValue ? [defaultValue] : []);
  const selectEl = useRef();
  const selectDivEl = useRef();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target === selectDivEl.current) {
        e.stopPropagation();
        return;
      }
      setExpanded(false);
    });
  }, []);

  useEffect(() => {
    if (refEl) refEl.current = selectEl.current;
  }, [selectEl.current]);

  const colours = {
    primary: {
      bg: "bg-primary text-background",
      fill: "fill-background",
      hover: "hover:bg-primary-dark",
    },
    secondary: {
      bg: "bg-secondary",
      fill: "fill-text",
      hover: "hover:bg-secondary-dark",
    },
    background: {
      bg: "bg-background",
      fill: "fill-text",
      hover: "hover:bg-background-dark",
    },
    accent: {
      bg: "bg-accent text-background",
      fill: "fill-background",
      hover: "hover:bg-accent-dark",
    },
  };

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };
  const enableChoice = (value, id) => {
    selectEl.current[id].selected = true;
    if (multiple) {
      setSelected([...selected, value]);
    } else {
      setSelected([value]);
    }
    onChange(selectEl.current);
  };

  const disableChoice = (option) => {
    selectEl.current[options.indexOf(option)].selected = false;
    setSelected(selected.filter((item) => item !== option));
    onChange(selectEl.current);
  };

  return (
    <div className={className}>
      <select
        ref={selectEl}
        id={name}
        name={name}
        className="hidden"
        defaultValue={defaultValue}
        multiple={multiple}
      >
        {options.map((option, id) => (
          <option key={`hidden-option-${id}`} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div
        className={`cursor-pointer select-none rounded-md ${colours[colour].bg} relative`}
        onClick={toggleExpanded}
        onMouseDown={(e) => e.preventDefault()}
        tabIndex="0"
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
      >
        <p
          ref={selectDivEl}
          className="relative h-10 block leading-9 px-3 flex items-center pr-10"
        >
          {icon ? (
            <span className="h-full py-2 mr-2 [&>*]:h-full">{icon}</span>
          ) : null}
          {multiple
            ? placeholder
            : selected.length > 0
            ? `${placeholder}: ${selected}`
            : placeholder}

          <span className="h-4 absolute top-1/2 right-2 translate-y-[-50%]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`h-full ${colours[colour].fill}`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
              />
            </svg>
          </span>
        </p>
        <div
          className={`${!expanded && "hidden"} absolute top-12 ${
            colours[colour].bg
          } rounded-md left-0 w-full py-2 max-h-[10rem] overflow-y-scroll z-10 shadow-md`}
        >
          {options.map((option, id) => {
            if (multiple && selected.includes(option)) return null;
            return (
              <div
                key={`option-${id}`}
                onClick={(e) => enableChoice(e.target.dataset.value, id)}
                data-value={option}
                className={`mx-2 px-3 h-8 rounded-md flex items-center ${colours[colour].hover}`}
                tabIndex={-1}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>

      {multiple &&
        selected.map((option, key) => (
          <div
            key={`selected-${key}`}
            className="mt-2 relative px-3 h-9 leading-9 bg-secondary rounded-md"
          >
            {option}
            <span
              onClick={() => disableChoice(option)}
              className="select-none flex items-center justify-center absolute cursor-pointer right-2 top-1/2 translate-y-[-50%] w-5 h-5 rounded bg-accent text-background"
            >
              ⨯
            </span>
          </div>
        ))}
    </div>
  );
};

Select.defaultProps = {
  colour: "primary",
  placeholder: "Select from the following",
  multiple: false,
  defaultValue: null,
  className: "",
  onChange: () => {},
  refEl: null,
};

export default Select;
