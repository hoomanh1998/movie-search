export interface Movie {
  id?: string;
  year: number;
  title: string;
  actors: string;
  runTime: string;
  imdbRating: number;
  rated: string;
  released: string;
  country: string;
  director: string;
  plot: string;
  genre: string;
  poster: string;
}

export interface SimilarMovie {
  title: string;
  poster: string;
}

export interface SearchResult extends SimilarMovie {
  id: string;
}

export type Filter = {
  id: number;
  title: string;
  value: string;
};
