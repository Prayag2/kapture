function Input({ placeholder, type, name, icon, otherProps }) {
  return (
    <div className="px-3 h-9 rounded-md bg-secondary flex items-center">
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
  );
}

Input.defaultProps = {
  type: "text",
  placeholder: "Input",
};

export default Input;
