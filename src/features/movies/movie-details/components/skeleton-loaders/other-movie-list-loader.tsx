const OtherMovieListLoader = () => {
  return (
    <div className="flex flex-row overflow-x-scroll -mx-5 pl-5 scrollbar-hide">
      {Array.from(Array(8).keys()).map((_, i) => (
        <div key={i} className="flex flex-col mr-5">
          <div className="w-36 sm:w-48 aspect-[2/3] animate-pulse-fast flex flex-col flex-shrink-0 items-center shadow-lg bg-gray-700 rounded-xl mb-3" />
          <div className="w-full text-center animate-pulse-fast bg-gray-600 px-6 py-1.5 rounded mb-2" />
          <div className="w-2/3 text-center animate-pulse-fast bg-gray-600 px-6 py-1.5 rounded" />
        </div>
      ))}
    </div>
  );
};

export default OtherMovieListLoader;
