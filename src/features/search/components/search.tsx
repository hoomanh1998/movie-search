import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSearch } from "../store";
import { useMovieListScroll } from "@features/movies";
import { useFirstNode } from "@features/movies/movie-list/hooks/useFirstNode";
import { Searchbar } from "./searchbar";
import { RecentSearches } from "./recent-searches";
import { Filters, useFilterMovies } from "@features/filters";
import { Filter } from "@utils/types";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchbarRef = useRef<HTMLInputElement>(null);
  
  const { resetFirstNodeId, setFirstNodeIdChanged } = useFirstNode((state) => ({
    resetFirstNodeId: state.resetFirstNodeId,
    setFirstNodeIdChanged: state.setFirstNodeIdChanged,
  }));

  const { query, setQuery, recentSearchQueries, addToRecentSearch } =
    useSearch();

  const hasQuery = query.length > 0;

  const { activeFilter, setActiveFilter } = useFilterMovies();

  const { isSuccess, isFetching, isFetched, isError, error, remove, refetch } =
    useMovieListScroll({
      query: query || searchParams.get("query")!,
      selectedFilter: activeFilter,
    });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    isFetched && setFirstNodeIdChanged(true);
    setQuery(event.target.value);
  };

  const clearInputHandler = () => {
    setQuery("");
    setFirstNodeIdChanged(true);
    resetFirstNodeId();
    remove();
  };

  const searchMovieHandler = () => {
    if (!hasQuery) return;
    location.pathname === "/"
      ? navigate(`/search?query=${query}`)
      : setSearchParams(`query=${query}`);
    searchbarRef.current && searchbarRef.current.blur();
    addToRecentSearch();
    remove();
    refetch();
  };

  const clickEnterHandler = (event: React.KeyboardEvent) => {
    if (!hasQuery) return;
    if (event.hasOwnProperty("key") && event.key === "Enter") {
      searchMovieHandler();
    }
  };

  const selectFilterHandler = (filter: Filter) => {
    setFirstNodeIdChanged(true);
    resetFirstNodeId();
    setActiveFilter(filter);
    hasQuery && remove();
  };

  const addRecentSearchToInput = (recentSearch: string) => {
    setQuery(recentSearch.trim());
    searchbarRef.current?.focus();
  };

  useEffect(() => {
    setQuery(searchParams.get("query") || "");
    if (searchParams.get("query")) {
      addToRecentSearch(searchParams.get("query")!);
      refetch();
    }
  }, []);

  useEffect(() => {
    hasQuery && !isFetched && searchMovieHandler();
  }, [activeFilter.id]);

  return (
    <div className="relative flex flex-col w-full sm:max-w-xl">
      <div className="flex flex-col sm:flex-row w-full h-full items-start sm:items-center sm:justify-center space-y-5 sm:space-x-3 sm:space-y-0 mx-auto mb-8 sm:mt-20 sm:mb-28">
        <Searchbar
          ref={searchbarRef}
          query={query}
          onSearchMovie={searchMovieHandler}
          onClearInput={clearInputHandler}
          onChange={inputChangeHandler}
          onKeyDown={clickEnterHandler}
        />
        <Filters
          selectedFilter={activeFilter}
          onSelectFilter={selectFilterHandler}
        />
      </div>
      {!isSuccess && !isFetching && recentSearchQueries.length > 0 && (
        <RecentSearches
          searches={recentSearchQueries}
          onAddToSearchbar={addRecentSearchToInput}
        />
      )}
      {isError && (
        <p className="w-full my-5 text-left font-bold text-xl text-red-500">
          {error?.message}
        </p>
      )}
    </div>
  );
};

export default Search;
