import { useInfiniteQuery } from "@tanstack/react-query";
import { getData } from "@utils/api";
import { BASE_URL } from "@utils/constant";
import { Filter, SearchResult } from "@utils/types";

interface IMovieListScroll {
  query: string;
  selectedFilter: Filter;
}

export const useMovieListScroll = ({
  query,
  selectedFilter,
}: IMovieListScroll) => {
  const fetchMovieList = async ({ pageParam = 1 }): Promise<SearchResult[]> => {
    return {
      ...(await getData(BASE_URL, {
        s: query.trim(),
        page: pageParam,
        ...(selectedFilter.value && {
          type: selectedFilter.title.toLowerCase(),
        }),
      })),
      pageParam,
    };
  };

  const {
    data,
    isFetching,
    isFetched,
    isSuccess,
    isError,
    error,
    refetch,
    remove,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<any, Error, SearchResult>({
    queryKey: ["movieList", selectedFilter],
    queryFn: fetchMovieList,
    getNextPageParam: (lastPage) => {
      return +lastPage.totalResults > lastPage.pageParam * 10
        ? lastPage.pageParam + 1
        : null;
    },
    refetchOnWindowFocus: true,
    enabled: false,
    select: (data) => {
      const transformedData = data.pages
        .reduce((a, b) => {
          return { Search: [...a.Search, ...b.Search] };
        })
        .Search.map((item: any) => ({
          id: item.imdbID,
          title: item.Title,
          poster: item.Poster === "N/A" ? "" : item.Poster,
        }));
      return {
        pages: transformedData,
        pageParams: data.pageParams,
      };
    },
  });

  return {
    data,
    isFetching,
    isFetched,
    isSuccess,
    isError,
    error,
    refetch,
    remove,
    hasNextPage,
    fetchNextPage,
  };
};
