import { useState } from "react";

const ImageList = ({
  media,
  onClick,
  onMouseEnter,
  defaultCurrentIndex,
  changeIndexOnHover,
}) => {
  const [currentIndex, setCurrentIndex] = useState(defaultCurrentIndex);

  return (
    <ul className="mt-4 flex flex-nowrap gap-2">
      {media.map((medium, index) => (
        <li key={`imageGalleryThumb${index}`}>
          <button
            onMouseEnter={() => {
              if (changeIndexOnHover) setCurrentIndex(index);
              onMouseEnter(index);
            }}
            onClick={() => {
              setCurrentIndex(index);
              onClick(index);
            }}
            className={`aspect-square overflow-hidden w-full max-w-[3rem] rounded ${
              currentIndex === index &&
              "ring-2 ring-accent border-2 border-background"
            }`}
          >
            <img
              className={`w-full h-full object-contain bg-white ${
                medium.type === "video" && "p-2"
              }`}
              src={medium.isVideo ? "/images/icons/play.svg" : medium.url}
              alt={medium.alt}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

ImageList.defaultProps = {
  onClick: () => {},
  onMouseEnter: () => {},
  defaultCurrentIndex: 0,
  changeIndexOnHover: false,
};

export default ImageList;
