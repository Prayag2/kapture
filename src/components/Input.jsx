function Input({
  placeholder,
  type,
  name,
  icon,
  otherProps,
  className,
  label,
}) {
  return (
    <div>
      {label ? (
        <label htmlFor={name} className="mr-2 capitalize block mb-2">
          {label}:
        </label>
      ) : null}
      <div
        className={`px-3 h-9 rounded-md bg-secondary flex items-center ${className} w-full`}>
        {icon ? (
          <span className="h-full py-2 mr-2 [&>*]:h-full">{icon}</span>
        ) : null}
        <input
          type={type}
          id={name}
          name={name}
          className="outline-none placeholder:text-primary bg-secondary w-full"
          placeholder={placeholder}
          {...otherProps}
        />
      </div>
    </div>
  );
}

Input.defaultProps = {
  type: "text",
  placeholder: "Input",
  label: "",
};

export default Input;
