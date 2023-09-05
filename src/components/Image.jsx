import { useState, forwardRef } from "react";
import Loading from "/src/components/Loading";

const Image = forwardRef(({ alt, src, className, imageClassName }, ref) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={`${className} h-full w-full`}>
      {loading && <Loading />}
      <img
        ref={ref}
        className={imageClassName}
        onLoad={() => setLoading(false)}
        alt={alt}
        src={src}
      />
    </div>
  );
});

Image.defaultProps = {
  className: "",
};

export default Image;
