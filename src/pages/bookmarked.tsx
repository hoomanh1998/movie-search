import { useMovieDetails } from "@features/movies/movie-details/services";
import { MovieCard } from "@movieList/components";
import { Heading } from "ui";

const Bookmarked = () => {
  const { bookmarkedMovies, removeFromBookmark } = useMovieDetails();

  return (
    <div className="flex flex-col w-full min-h-screen sm:items-center text-white p-5">
      <Heading title="Bookmarked Movies" />
      <div className="flex flex-col flex-1 w-full max-w-5xl">
        {bookmarkedMovies.length === 0 ? (
          <p className="text-center my-auto">No movies bookmarked yet!</p>
        ) : (
          <ul className="w-full grid gap-5 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 max-w-5xl sm:my-10">
            {bookmarkedMovies.map(({ id, title, poster }) => (
              <MovieCard
                key={id}
                id={id}
                poster={poster}
                title={title}
                bookmarked
                onRemove={removeFromBookmark}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Bookmarked;
