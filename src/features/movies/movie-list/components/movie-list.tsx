import React from "react";
import { InfiniteData } from "@tanstack/react-query";
import { SearchResult } from "@utils/types";
import { MovieCard } from "./movie-card";

interface IMovieList {
  movies: InfiniteData<SearchResult>;
  lastRef: (node: any) => void;
}

const MovieList = ({ movies, lastRef }: IMovieList) => {
  return (
    <React.Fragment>
      {movies.pages.map(({ id, poster, title }, i) => {
        return movies.pages.length === i + 1 ? (
          <MovieCard
            key={i}
            id={id}
            poster={poster}
            title={title}
            reference={lastRef}
          />
        ) : (
          <MovieCard key={i} id={id} poster={poster} title={title} />
        );
      })}
    </React.Fragment>
  );
};

export default MovieList;
