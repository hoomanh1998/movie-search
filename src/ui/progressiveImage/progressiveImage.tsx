import React, { useState } from "react";
import srcPlaceholder from "@images/movie-placeholder.png";
import clsx from "clsx";

type IProgressiveImage = {
  type: "card" | "page" | "full";
} & React.ImgHTMLAttributes<HTMLImageElement>;

const ProgressiveImage = ({
  type,
  src,
  className,
  ...props
}: IProgressiveImage) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const loadingClasses = clsx(
    "animate-pulse-fast w-full shadow-lg bg-gray-700",
    {
      "w-full aspect-[2/3] mb-1.5 rounded-xl": type === "card",
    },
    {
      "w-full aspect-[2/3] rounded-xl": type === "page",
    },
    {
      "absolute left-0 top-0 w-full aspect-[2/3]": type === "full",
    }
  );

  const imageClasses = clsx(
    className,
    {
      "block animate-fade-in": imageLoaded === true,
    },
    {
      hidden: imageLoaded === false,
    }
  );

  const imageLoadHandler = () => {
    setImageLoaded(true);
  };

  return (
    <React.Fragment>
      {!imageLoaded && <div className={loadingClasses} />}
      <img
        className={imageClasses}
        src={src || srcPlaceholder}
        onLoad={() => imageLoadHandler()}
        onError={() => imageLoadHandler()}
        {...props}
      />
    </React.Fragment>
  );
};

export default ProgressiveImage;
