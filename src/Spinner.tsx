import React from "react";

const Spinner = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-64 w-64 border-t-8 border-b-8 border-purple-500"></div>
      <div className="absolute flex justify-center items-center h-64 w-64">
        <span role="img" aria-label="Movie Emoji" style={{ fontSize: "4rem" }}>
          🎬
        </span>
      </div>
    </div>
  );
};

export default Spinner;
