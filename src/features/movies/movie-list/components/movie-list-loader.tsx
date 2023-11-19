import React from "react";

const MovieListLoader = ({ amount }: { amount: number }) => {
  return (
    <React.Fragment>
      {[...Array(amount)].map((_, index) => (
        <div
          key={index}
          className="aspect-[2/3] animate-pulse-fast flex flex-col flex-shrink-0 w-full items-center shadow-lg bg-gray-700 rounded-xl"
        />
      ))}
    </React.Fragment>
  );
};

export default MovieListLoader;
