import { useState } from "react";

const Image = ({ alt, src, className, imageClassName }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={`${className}`}>
      {loading && "Loading..."}
      <img
        className={imageClassName}
        onLoad={() => setLoading(false)}
        alt={alt}
        src={src}
      />
    </div>
  );
};

export default Image;
