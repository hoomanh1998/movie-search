import { Search } from "@search/components";
import { ScrollToTop, Heading } from "ui";
import { MovieListWrapper } from "@features/movies/movie-list";
import MovieIconPatterns from "layouts/movie-icon-patterns";

const Home = () => {
  return (
    <div className="relative flex flex-col w-full min-h-screen sm:items-center text-white p-5 overflow-hidden">
      <Heading title="Home" />
      <div className="flex flex-col w-full sm:items-center max-w-5xl">
        <Search />
        <MovieListWrapper />
        <ScrollToTop />
        <MovieIconPatterns />
      </div>
    </div>
  );
};

export default Home;
