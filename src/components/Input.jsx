import { useState } from "react";

function Input({
  placeholder,
  type,
  name,
  icon,
  otherProps,
  className,
  label,
  required,
  pattern,
  invalidMessage
}) {
  const [isValid, setIsValid] = useState(true);
  const validateInput = (e) => {
    if (!pattern.test(e.target.value) && (!required ? e.target.value.length > 0 : true)) {
      e.target.setCustomValidity(invalidMessage);
      setIsValid(false);
    } else {
      e.target.setCustomValidity("");
      setIsValid(true);
    }
  };

  return (
    <div className={className}>
      {label ? (
        <label htmlFor={name} className="mr-2 capitalize block mb-2">
          {label}{required && <span className="text-error">*</span> }:
        </label>
      ) : null}
      <div
        className={`px-3 h-9 rounded-md bg-secondary flex items-center w-full border-2 ${isValid ? "border-none" : "border-error"}`}>
        {icon ? (
          <span className="h-full py-2 mr-2 [&>*]:h-full">{icon}</span>
        ) : null}
        <input
          type={type}
          id={name}
          name={name}
          className="outline-none placeholder:text-primary bg-secondary w-full"
          placeholder={placeholder}
          required={required}
	  onChange={e => pattern ? validateInput(e) : null}
          {...otherProps}
        />
      </div>
      {!isValid && <p className="mt-2 text-error">{invalidMessage}</p> }
    </div>
  );
}

Input.defaultProps = {
  type: "text",
  placeholder: "Input",
  label: "",
  required: false,
  pattern: /^([a-z]|[A-Z]|\s)+$/,
  invalidMessage: "This field can't be empty!"
};

export default Input;
