import { useState } from "react";
import { useValidate } from "/src/hooks/Validate";

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
  const [isInputValid, setIsInputValid] = useState(true);
  const {isValid} = useValidate();
  const validateInput = (e) => {
    if (isValid(pattern, e.target.value, required)) {
      e.target.setCustomValidity("");
      setIsInputValid(true);
    } else {
      e.target.setCustomValidity(invalidMessage);
      setIsInputValid(false);
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
        className={`px-3 h-9 rounded-md bg-secondary flex items-center w-full border-2 ${isInputValid ? "border-none" : "border-error"}`}>
        {icon ? (
          <span className="h-full py-2 mr-2 [&>*]:h-full">{icon}</span>
        ) : null}
        <input
          type={type}
          id={name}
          name={name}
          className="outline-none placeholder:text-primary bg-secondary w-full peer"
          placeholder={placeholder}
          required={required}
	  onChange={e => pattern ? validateInput(e) : null}
          {...otherProps}
        />
      </div>
      {!isInputValid && <p className="mt-2 text-error">{invalidMessage}</p> }
    </div>
  );
}

Input.defaultProps = {
  type: "text",
  placeholder: "Input",
  label: "",
  required: false,
  pattern: /^.+$/,
  invalidMessage: "This field can't be empty!"
};

export default Input;
