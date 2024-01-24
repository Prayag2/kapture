import { useRef, useState, useEffect } from "react";

function TextArea({
  placeholder,
  type,
  name,
  icon,
  otherProps,
  className,
  label,
  required
}) {
  const textAreaEl = useRef();
  const [textAreaHeight, setTextAreaHeight] = useState();

  useEffect(()=>setTextAreaHeight(textAreaEl.current.scrollHeight + "px"), [])

  return (
    <div>
      {label ? (
        <label htmlFor={name} className="mr-2 capitalize block mb-2">
          {label}:
	  {required ? <span className="text-error">*</span> : null}
        </label>
      ) : null}
      <div
        className={`p-3 min-w-[100%] rounded-md bg-secondary flex items-center ${className} w-full`}>
        {icon ? (
          <span className="h-full py-2 mr-2 [&>*]:h-full">{icon}</span>
        ) : null}
        <textarea
          ref={textAreaEl}
          type={type}
          id={name}
          name={name}
          className="outline-none placeholder:text-primary bg-secondary w-full"
          style={{ height: textAreaHeight }}
          onInput={() =>
            setTextAreaHeight(textAreaEl.current.scrollHeight + "px")
          }
          placeholder={placeholder}
	  required={required}
          {...otherProps}></textarea>
      </div>
    </div>
  );
}

TextArea.defaultProps = {
  type: "text",
  placeholder: "TextArea",
  label: "",
  required: false
};

export default TextArea;
