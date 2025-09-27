import React from "react";
const camera = () => {
  return (
    <div className="lg:w-full lg:h-full w-screen h-screen">
      <video controls width="100%" height="100%">
        <source
          src="/video/Screen Recording 2025-05-04 200929.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default camera;
