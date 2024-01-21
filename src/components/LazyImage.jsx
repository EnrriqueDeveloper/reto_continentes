import React from "react";

const LazyImage = ({ imageUrl }) => {
  return <img className="w-full h-[165px] object-cover" src={imageUrl} alt="country image" />;
};

export default LazyImage;
