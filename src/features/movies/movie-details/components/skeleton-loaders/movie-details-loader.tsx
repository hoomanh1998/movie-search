const MovieDetailsLoader = ({ isOnTop }: { isOnTop: boolean }) => {
  return (
    <div className="relative w-full flex flex-col h-screen">
      <div className="sticky top-0">
        <div className="animate-pulse-fast aspect-[2/3] w-full shadow-lg bg-gray-700 min-h-144 sm:min-h-60 sm:h-[40vh]" />
      </div>
      <div className="absolute w-full sm:sticky sm:top-56 z-10">
        <div
          className={`bg-gray-800 aspect-[2/3] object-cover relative sm:absolute left-1/2 sm:left-12 2xl:left-60 -translate-x-1/2 sm:translate-x-0 w-full min-h-144 sm:min-h-60 sm:w-80 sm:-top-44 sm:rounded-2xl transition-all duration-500 sm:transition-none z-10 sm:pointer-events-none select-none shadow-md sm:scale-100 overflow-hidden ${
            isOnTop
              ? "top-0 scale-100 rounded-none"
              : "top-24 scale-75 rounded-3xl"
          }`}
        >
          <div className="animate-pulse-fast bg-gray-600 absolute left-0 top-0 h-full w-full" />
        </div>
      </div>
      <div className="flex flex-col w-full bg-gray-800 h-full z-0">
        <div
          className={`relative flex flex-col w-full bg-gray-800 border-t-4 border-blue-500 text-white p-5 pb-20 sm:p-12 sm:pl-[26rem] 2xl:pl-[40rem] 2xl:pr-[18rem] z-0 transition-transform duration-500 sm:translate-y-0 sm:transition-none ${
            isOnTop ? "-translate-y-0" : "-translate-y-32"
          }`}
        >
          <div
            className={`flex flex-col transition-transform duration-500 sm:translate-y-0 sm:transition-none ${
              isOnTop ? "translate-y-0" : "translate-y-48"
            }`}
          >
            <div className="animate-pulse-fast w-5/6 sm:w-96 text-4xl mb-5 h-10 bg-gray-500 rounded-md" />
            <div className="animate-pulse-fast flex flex-row items-center space-x-3 mb-5">
              <div className="w-1/2 h-6 sm:w-36 bg-gray-600 rounded-md" />
              <div className="text-gray-400">|</div>
              <div className="w-1/2 h-6 sm:w-36 bg-gray-600 rounded-md" />
              <div className="text-gray-400">|</div>
              <div className="w-1/2 h-6 sm:w-36 bg-gray-600 rounded-md" />
            </div>
            <div className="animate-pulse-fast flex flex-row flex-wrap gap-3 mb-5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1/4 sm:w-32 h-8 text-center bg-gray-600 px-6 py-1.5 rounded-full"
                />
              ))}
            </div>
            <div className="animate-pulse-fast w-1/2 sm:w-52 h-4 bg-gray-500 px-6 py-1.5 rounded-md mb-5" />
            <div className="animate-pulse-fast flex flex-col space-y-3 mb-5">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-4 bg-gray-500 px-6 py-1.5 rounded-md"
                />
              ))}
              <div className="w-1/2 h-4 bg-gray-500 px-6 py-1.5 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsLoader;
