import { useState, useMemo, useRef, useEffect } from "react";
import ImageList from "/src/components/ImageList";
import Image from "/src/components/Image";

const ImageGallery = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMedium = useMemo(
    () => media[currentIndex],
    [media, currentIndex],
  );
  const imageWrapper = useRef();
  const mainImage = useRef();
  let zoomEnabled = false;

  useEffect(() => {
    currentMedium.type === "image" && zoomOutImage();
  }, [currentIndex]);

  const toggleZoom = (e) => (zoomEnabled ? zoomOutImage() : zoomInImage(e));
  const zoomInImage = (e) => {
    zoomEnabled = true;
    mainImage.current.style.scale = "300%";
    imageWrapper.current.classList.add("cursor-zoom-out");
    imageWrapper.current.classList.remove("cursor-zoom-in");
    handleZoom(e);
  };
  const zoomOutImage = () => {
    zoomEnabled = false;
    mainImage.current.style.scale = "100%";
    imageWrapper.current.classList.add("cursor-zoom-in");
    imageWrapper.current.classList.remove("cursor-zoom-out");
    mainImage.current.style.transform = `translate(0px, 0px)`;
  };

  function handleZoom(e) {
    if (!zoomEnabled) return;
    const wrapperRect = imageWrapper.current.getBoundingClientRect();
    const imageRect = mainImage.current.getBoundingClientRect();
    const touchingLeft = imageRect.left > wrapperRect.left;
    let xOffset =
      Math.floor(e.clientX - wrapperRect.left - wrapperRect.width / 2) * -1;
    let yOffset =
      Math.floor(e.clientY - wrapperRect.top - wrapperRect.height / 2) * -1;

    mainImage.current.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;
  }

  return (
    <div className="w-full max-w-[30rem] ">
      {currentMedium.isVideo ? (
        <video
          preload="metadata"
          className="w-full bg-white rounded-md aspect-square"
          controls
        >
          <source src={`${currentMedium.url}#t=0.1`} type="video/mp4" />
        </video>
      ) : (
        <div
          ref={imageWrapper}
          onClick={toggleZoom}
          onMouseMove={handleZoom}
	  onMouseLeave={zoomOutImage}
          className={`w-full overflow-hidden rounded-md aspect-square bg-white cursor-zoom-in`}
        >
          <Image
            ref={mainImage}
            src={currentMedium.url}
            alt={currentMedium.alt}
            imageClassName="w-full h-full object-contain transition-all duration-200 ease-out"
          />
        </div>
      )}
      <ImageList
        media={media}
        onClick={(index) => setCurrentIndex(index)}
        onMouseEnter={(index) => setCurrentIndex(index)}
        currentIndex={currentIndex}
        changeIndexOnHover
      />
    </div>
  );
};

ImageGallery.defaultProps = {
  media: [],
};

export default ImageGallery;
