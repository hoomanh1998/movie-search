import MovieIcon from "@icons/moive-icon";

const MovieIconPatterns = () => {
  return (
    <div className="absolute flex flex-col justify-center items-center left-1/2 -translate-x-1/2 -bottom-10 select-none">
      <div className="relative left-0 top-0 flex flex-row mb-5">
        {Array.from(Array(4).keys()).map((_, i) => (
          <MovieIcon
            key={i}
            className="flex odd:w-24 even:w-20 sm:odd:w-44 sm:even:w-36 shrink-0 opacity-20 first:opacity-10 last:opacity-10 rotate-45 mr-10 sm:mr-20 last:mr-0"
          />
        ))}
      </div>
      <div className="relative left-0 flex flex-row mb-5">
        {Array.from(Array(7).keys()).map((_, i) => (
          <MovieIcon
            key={i}
            className="flex odd:w-24 even:w-20 sm:odd:w-44 sm:even:w-36 shrink-0 opacity-30 first:opacity-10 last:opacity-10 rotate-45 mr-10 sm:mr-20 last:mr-0"
          />
        ))}
      </div>
      <div className="relative left-5 flex flex-row">
        {Array.from(Array(6).keys()).map((_, i) => (
          <MovieIcon
            key={i}
            className="flex odd:w-24 even:w-20 sm:odd:w-44 sm:even:w-36 shrink-0 opacity-40 first:opacity-20 last:opacity-20 rotate-45 mr-10 sm:mr-20 last:mr-0"
          />
        ))}
      </div>
    </div>
  );
};

export default MovieIconPatterns;
