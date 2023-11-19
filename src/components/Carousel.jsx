import { useState, useEffect, useRef } from "react";
import Image from "/src/components/Image";
import Button from "/src/components/Button";

const Carousel = ({ slides, className }) => {
  let [curIndex, setCurIndex] = useState(0);
  const imageWrapper = useRef();
  const delay = 10000;

  const nextImage = () => {
    setCurIndex((prev) => (prev + 1) % slides.length);
  };

  const prevImage = () => {
    setCurIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const imageElements = imageWrapper.current.children;
    for (let i = 0; i < imageElements.length; i++) {
      imageElements[i].style.transform = `translateX(${(i - curIndex) * 100}%)`;
    }
  }, [curIndex]);

  useEffect(() => {
    const interval = setInterval(nextImage, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full h-[30rem] rounded-md overflow-hidden relative ${className}`}>
      <div className="bg-secondary w-full h-full" ref={imageWrapper}>
        {slides.map((slide, i) => (
          <div
            key={`carouselImage${i}`}
            className="w-full h-full transition-[transform] duration-500 absolute top-0">
            <Image imageClassName="object-cover" src={slide.imageURL} />
            <div className="w-full h-full absolute top-0 left-0 bg-primary opacity-25"></div>
            <div className="absolute bottom-5 left-1/2 translate-x-[-50%] text-center w-full px-5">
              {slide.title ? (
                <h2 className="text-xl md:text-2xl text-background font-display font-bold">
                  {slide.title}
                </h2>
              ) : null}
              {slide.subtitle ? (
                <h3 className="text-md md:text-lg text-background">
                  {slide.subtitle}
                </h3>
              ) : null}
              {slide.buttonTitle ? (
                <Button
                  to={slide.buttonLink}
                  className="mx-auto mt-4"
                  colour="secondary">
                  {slide.buttonTitle}
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="w-full absolute top-1/2 translate-y-[-50%] flex justify-between px-5">
          <Button
            onClick={prevImage}
            icon={
              <img
                className="rotate-180"
                alt=""
                src="/images/icons/arrow.svg"
              />
            }
            colour="secondary"
            circle></Button>
          <Button
            onClick={nextImage}
            icon={<img alt="" src="/images/icons/arrow.svg" />}
            colour="secondary"
            circle></Button>
        </div>
      )}
    </div>
  );
};

Carousel.defaultProps = {
  slides: [],
  className: "",
};

export default Carousel;
