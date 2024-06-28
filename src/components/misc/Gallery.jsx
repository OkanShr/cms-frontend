import React from "react";
import "./lightbox.css"; // This can be removed if no other styles are used

const Gallery = ({
  clickedImg,
  setClickedImg,
  handelRotationRight,
  handelRotationLeft,
}) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setClickedImg(null);
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 w-full h-full bg-[rgba(27,27,27,0.54)] flex items-center dismiss"
        onClick={handleClick}
      >
        <img
          loading="lazy"
          src={clickedImg}
          alt="bigger pic"
          className="block max-w-[60%] max-h-[80%] m-auto shadow-[3px_5px_7px_rgba(0,0,0,0.5)]"
        />
        <span
          className="absolute top-5 right-5 text-3xl text-black z-[999] cursor-pointer dismiss"
          onClick={handleClick}
        >
          X
        </span>
        <div
          onClick={handelRotationLeft}
          className="flex justify-between absolute top-1/2 left-0 w-[50px] h-[50px] z-[999] cursor-pointer"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div
          onClick={handelRotationRight}
          className="flex justify-between absolute right-0 top-1/2 w-[50px] h-[50px] z-[999] cursor-pointer"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
export default Gallery;
