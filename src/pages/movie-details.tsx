import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useScroll } from "@movieDetails/hooks";
import { useMovieDetails } from "@movieDetails/services";
import {
  Badges,
  CastList,
  MovieDetailsLoader,
  OtherMovieList,
  StarRating,
} from "@movieDetails/components";
import { ProgressiveImage } from "ui";
import { Movie } from "@utils/types";
import { formatTime } from "@utils/helper";
import BookmarkIcon from "@icons/bookmark-icon";
import ArrowUpIcon from "@icons/arrow-up-icon";

const MovieDetails = () => {
  const { isOnTop } = useScroll();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    getMovieDetails,
    addToBookmark,
    removeFromBookmark,
    checkMovieIsBookmarked,
  } = useMovieDetails((state) => ({
    getMovieDetails: state.getMovieDetails,
    addToBookmark: state.addToBookmark,
    removeFromBookmark: state.removeFromBookmark,
    checkMovieIsBookmarked: state.checkMovieIsBookmarked,
  }));

  const { error, isLoading, data } = useQuery<Movie, Error>({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id!),
    refetchOnWindowFocus: false,
  });

  const [bookmarked, setBookmarked] = useState<boolean>(
    checkMovieIsBookmarked(id!)
  );

  const toggleBookmarkIconHandler = () => {
    setBookmarked((prevState) => !prevState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setBookmarked(checkMovieIsBookmarked(id!));
  }, [id]);

  if (isLoading) {
    return <MovieDetailsLoader isOnTop={isOnTop} />;
  }

  if (error) {
    return (
      <div className="flex h-screen text-white justify-center items-center">
        {error.message}
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col min-h-screen">
      <ArrowUpIcon
        className="absolute left-7 top-7 w-10 h-10 stroke-white bg-gray-800 bg-opacity-50 p-1.5 rounded-xl cursor-pointer z-40 -rotate-90"
        onClick={() => navigate(-1)}
      />
      <div className="sticky top-0 overflow-hidden">
        <ProgressiveImage
          src={data.poster}
          className="aspect-[2/3] object-cover w-full min-h-144 sm:min-h-60 sm:h-[40vh] scale-125 sm:scale-100 blur-sm select-none"
          type="full"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-50" />
      </div>
      <div className="absolute w-full sm:sticky sm:top-56 z-10">
        <ProgressiveImage
          src={data.poster}
          className={`aspect-[2/3] object-cover relative sm:absolute left-1/2 sm:left-12 2xl:left-60 -translate-x-1/2 sm:translate-x-0 w-full min-h-144 sm:min-h-60 sm:w-80 sm:-top-44 sm:rounded-2xl transition-all duration-500 sm:transition-none sm:pointer-events-none select-none sm:scale-100 shadow-[0_0_60px_-20px_rgba(59,130,246,0.3)] ${
            isOnTop
              ? "top-0 scale-100 rounded-none"
              : "top-24 scale-75 rounded-3xl"
          }`}
          type="page"
          width="300"
          height="700"
        />
      </div>
      <div className="bg-gray-800 h-full z-0">
        <div
          className={`relative flex flex-col bg-gray-800 border-t-4 border-blue-500 text-white p-5 pb-14 sm:p-12 sm:pl-[26rem] 2xl:pl-[40rem] 2xl:pr-[18rem] z-0 transition-transform duration-500 sm:translate-y-0 sm:transition-none ${
            isOnTop ? "-translate-y-0" : "-translate-y-40"
          }`}
        >
          <div
            className={`flex flex-col transition-transform duration-500 sm:translate-y-0 sm:transition-none ${
              isOnTop ? "translate-y-0" : "translate-y-48"
            }`}
          >
            <h3 className="font-bold w-5/6 text-4xl mb-5">{data.title}</h3>
            <div
              className="absolute right-0 top-1 cursor-pointer"
              onClick={() => {
                toggleBookmarkIconHandler();
                bookmarked
                  ? removeFromBookmark(id!)
                  : addToBookmark({
                      id: id!,
                      title: data.title,
                      poster: data.poster,
                    });
              }}
            >
              <BookmarkIcon bookmarked={bookmarked} />
            </div>
            <div className="flex flex-wrap flex-row items-center justify-start gap-2 mb-5">
              <span className="font-bold text-gray-400">{data.year}</span>
              <div className="text-gray-400">|</div>
              {data.runTime && (
                <>
                  <div className="font-bold text-gray-400">
                    {formatTime(+data.runTime.split(" ")[0])}
                  </div>
                  <div className="text-gray-400">|</div>
                </>
              )}
              <StarRating rate={data.imdbRating} />
              <div className="text-gray-400">|</div>
              <div className="text-sm font-bold rounded-md border border-white px-1.5">
                {data?.rated}
              </div>
            </div>
            <Badges genre={data.genre} />
            {data.director && (
              <div className="flex flex-row text-lg sm:text-xl space-x-2 mb-5">
                <span className="font-bold">Director:</span>
                <div className="text-gray-400">{data.director}</div>
              </div>
            )}
            <p className="text-lg sm:text-xl text-gray-300 mb-5 ">
              {data.plot}
            </p>
            <CastList cast={data.actors} />
            <OtherMovieList movieID={id!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
