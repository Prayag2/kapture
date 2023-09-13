import { useState, forwardRef } from "react";

const Image = forwardRef(({ alt, src, className, imageClassName }, ref) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={`${className} h-full w-full relative`}>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-secondary transition-[opacity] duration-300 ${
          loading ? "opacity-100 animate-pulse" : "opacity-0 animate-none"
        }`}></div>
      <div
        className={`w-full h-full transition-[opacity] duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}>
        <img
          ref={ref}
          className={`${imageClassName} w-full h-full`}
          onLoad={() => setLoading(false)}
          alt={alt}
          src={src}
          loading="lazy"
        />
      </div>
      {loading && <div className="w-96 aspect-square"></div>}
    </div>
  );
});

Image.defaultProps = {
  className: "",
};

export default Image;
