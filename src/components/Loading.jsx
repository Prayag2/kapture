import React from "react";

const Loading = ({fullScreen}) => {
  return (
    <div className={`${fullScreen ? "fixed top-0 left-0" : ""} w-full h-full flex justify-center items-center`}>
      <svg
        className="animate-spin h-10 aspect-square"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
          stroke="#000000"
          strokeWidth="3.55556"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

Loading.defaultProps = {
  fullScreen: false
}

export default Loading;
