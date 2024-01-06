import React, { useCallback, useRef } from "react";
import MovieList from "./movie-list";
import MovieListLoader from "./movie-list-loader";
import { useMovieListScroll } from "../services";
import { useScrollToTop } from "../hooks";
import { useFilterMovies } from "@features/filters";
import { useFirstNode } from "../hooks/useFirstNode";
import { useSearchParams } from "react-router-dom";
import { SCROLL_TO_TOP_OFFSET } from "@utils/constant";

const MovieListWrapper = () => {
  const [searchParams] = useSearchParams();
  const observer = useRef<any>();
  const firstNodeObserver = useRef<any>();
  const showScrollBtn = useScrollToTop((state) => state.showScrollBtn);
  const {
    firstNodeId,
    firstNodeIdChanged,
    setFirstNodeIdChanged,
    setFirstNodeId,
  } = useFirstNode();
  const { activeFilter } = useFilterMovies();

  const {
    data,
    isFetching,
    isFetched,
    isSuccess,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useMovieListScroll({
    query: searchParams.get("query")!,
    selectedFilter: activeFilter,
  });

  const lastMovieRef = useCallback(
    (node: HTMLLIElement) => {
      if (isFetching) return;

      if (isFetched && firstNodeIdChanged && !firstNodeId)
        firstNodeObserver.current = null;

      if (!firstNodeObserver.current) {
        setFirstNodeIdChanged(false);
        firstNodeObserver.current = new IntersectionObserver(
          () => {
            showScrollBtn(window.scrollY > SCROLL_TO_TOP_OFFSET);
          },
          {
            rootMargin: "0px",
            threshold: 0.8,
          }
        );

        if (node) {
          !firstNodeId && setFirstNodeId(node.id);
          const firstNode = document.getElementById(firstNodeId || node.id);
          if (firstNode) firstNodeObserver.current.observe(firstNode);
        }
      }

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
        },
        {
          rootMargin: "200px",
          threshold: 0.5,
        }
      );
      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextPage]
  );

  return (
    <React.Fragment>
      {searchParams.get("query") && isFetched && !isError && (
        <div className="flex flex-row flex-wrap items-center mr-auto mb-5 whitespace-nowrap">
          <h5 className="text-2xl text-left font-bold mr-5">
            Search Results for:
          </h5>
          <span className="text-lg text-white px-3 py-2 bg-gray-900 rounded-lg">
            {searchParams.get("query")}
          </span>
        </div>
      )}
      <ul className="w-full grid grid-rows-2 gap-5 grid-cols-2 xs:grid-cols-3 md:grid-cols-4 max-w-5xl z-10">
        {searchParams.get("query") && isSuccess && (
          <MovieList movies={data!} lastRef={lastMovieRef} />
        )}
        {isFetching && <MovieListLoader amount={10} />}
      </ul>
    </React.Fragment>
  );
};

export default MovieListWrapper;
