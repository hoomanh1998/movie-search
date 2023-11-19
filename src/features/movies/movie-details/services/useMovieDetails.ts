import { create } from "zustand";
import { BASE_URL } from "@utils/constant";
import { getData } from "@utils/api";
import { extractMovieTitle } from "@utils/helper";
import { Movie, SearchResult as BookmarkedMovie } from "@utils/types";

interface IMovieDetails {
  movie: Movie | undefined;
  otherMovieList: Movie[];
  bookmarkedMovies: BookmarkedMovie[];
  getMovieDetails: (movieId: string) => Promise<Movie>;
  getOtherMovies: (movieTitle: string) => Promise<Movie[]>;
  addToBookmark: (movie: BookmarkedMovie) => void;
  removeFromBookmark: (id: string) => void;
  checkMovieIsBookmarked: (id: string) => boolean;
}

export const useMovieDetails = create<IMovieDetails>((set, get) => ({
  movie: undefined,
  otherMovieList: [],
  bookmarkedMovies: [],
  getMovieDetails: async (movieId) => {
    try {
      const movieDetails = await getData(BASE_URL, {
        i: movieId,
        plot: "full",
      });
      const normalizeMovieDetails: Movie = {
        title: movieDetails.Title,
        year: movieDetails.Year === "N/A" ? "" : movieDetails.Year,
        actors: movieDetails.Actors,
        country: movieDetails.Country,
        runTime: movieDetails.Runtime === "N/A" ? "" : movieDetails.Runtime,
        released: movieDetails.Released,
        director: movieDetails.Director === "N/A" ? "" : movieDetails.Director,
        plot: movieDetails.Plot,
        genre: movieDetails.Genre,
        poster: movieDetails.Poster === "N/A" ? "" : movieDetails.Poster,
        rated: movieDetails.Rated,
        imdbRating: movieDetails.imdbRating,
      };
      set(() => ({ movie: normalizeMovieDetails }));
      return normalizeMovieDetails;
    } catch (error) {
      throw new Error("No movie found!");
    }
  },
  getOtherMovies: async (movieID) => {
    try {
      const { Title: movieTitle } = await getData(BASE_URL, {
        i: movieID,
      });
      const movieBaseTitle = extractMovieTitle(movieTitle);
      const moviesData = await getData(BASE_URL, {
        s: movieBaseTitle,
        page: 1,
        plot: "short",
      });
      const otherMovies = moviesData.Search.map((item: any) => ({
        id: item.imdbID,
        title: item.Title,
        poster: item.Poster,
      })).filter((item: any) => item.id !== movieID);
      if (otherMovies.length === 0) throw new Error("No related movies found!");
      return otherMovies;
    } catch (error) {
      throw new Error("No related movies found!");
    }
  },
  addToBookmark: (movie) => {
    set((state) => ({
      bookmarkedMovies: [movie, ...state.bookmarkedMovies],
    }));
  },
  removeFromBookmark: (id) => {
    const { bookmarkedMovies } = get();
    const newBookmarked = bookmarkedMovies.filter((movie) => movie.id !== id);
    set(() => ({
      bookmarkedMovies: newBookmarked,
    }));
  },
  checkMovieIsBookmarked: (id) => {
    const { bookmarkedMovies } = get();
    return bookmarkedMovies.some((movie) => movie.id === id);
  },
}));
