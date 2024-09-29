import { useState } from "react";

export const Slider = ({ firstImage, secondImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full relative" onMouseUp={handleMouseUp}>
      <div
        className="relative w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        <img alt="" src={secondImage} className="w-full h-full object-cover" />

        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[700px] aspect-[70/45] m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img alt="" src={firstImage} className="w-full h-full object-cover" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};

//Code below is for images with cover attribute

// import { useState } from "react";

// export const Slider = ({ firstImage, secondImage }) => {
//   const [sliderPosition, setSliderPosition] = useState(50);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleMove = (event) => {
//     if (!isDragging) return;

//     const rect = event.currentTarget.getBoundingClientRect();
//     const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
//     const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

//     setSliderPosition(percent);
//   };

//   const handleMouseDown = () => {
//     setIsDragging(true);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className="w-full relative" onMouseUp={handleMouseUp}>
//       <div
//         className="relative w-full max-w-[700px] m-auto overflow-hidden select-none"
//         onMouseMove={handleMove}
//         onMouseDown={handleMouseDown}
//       >
//         {/* Second image as the background */}
//         <img alt="" src={secondImage} className="w-full h-full object-contain" />

//         {/* First image with clipping for the slider effect */}
//         <div
//           className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden select-none"
//           style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
//         >
//           <img alt="" src={firstImage} className="w-full h-full object-contain" />
//         </div>

//         {/* Slider line */}
//         <div
//           className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
//           style={{
//             left: `calc(${sliderPosition}% - 1px)`,
//           }}
//         >
//           <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
//         </div>
//       </div>
//     </div>
//   );
// };
