import { useState } from "react";
import { useFirstNode } from "@features/movies/movie-list/hooks/useFirstNode";
import { useFilterMovies } from "../store/useFilterMovies";
import { useMediaQuery } from "layouts/hooks/useMediaQuery";
import { toCamelCase } from "@utils/helper";
import { Filter } from "@utils/types";
import ArrowDownIcon from "@icons/arrow-down-icon";

interface IFilters {
  selectedFilter: Filter;
  onSelectFilter: (filter: Filter) => void;
}

const filtersBorderVector = [
  [0, 1, 0],
  [0, 0, 0],
  [1, 0, 0],
];

const Filters = ({ selectedFilter, onSelectFilter }: IFilters) => {
  const isMobile = useMediaQuery();
  const { filters, filtersListOpen, toggleFiltersList } = useFilterMovies();
  const setFirstNodeIdChanged = useFirstNode(
    (state) => state.setFirstNodeIdChanged
  );
  const [activeTab, setActiveTab] = useState(selectedFilter.id);
  const activeTabHandler = (id: number) => {
    setActiveTab(id);
  };

  const filtersComponent = isMobile ? (
    <div className="flex h-12 w-full bg-gray-700 rounded-xl shadow-lg p-1">
      <ul
        role="menu"
        className="relative flex flex-row h-full justify-between w-full"
      >
        <li
          className={`absolute left-0 top-0 bg-blue-500 w-1/3 h-full rounded-xl transition-transform ease-in-out shadow-md`}
          style={{ transform: `translateX(${(activeTab - 1) * 100}%)` }}
        />
        {filters.map((filter) => (
          <li
            key={filter.id}
            tabIndex={0}
            role="option"
            className={`w-full text-center last:border-0 my-2 z-10 ${
              filtersBorderVector[activeTab - 1].indexOf(1) + 1 === filter.id
                ? "border-r border-gray-600"
                : ""
            }`}
            onClick={() => {
              activeTabHandler(filter.id);
              onSelectFilter(filter);
            }}
          >
            {filter.title}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div
      className="relative flex flex-row h-full select-none z-20"
      onClick={() => {
        toggleFiltersList();
        setFirstNodeIdChanged(true);
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={filtersListOpen}
        className="flex items-center rounded-xl bg-gray-700 p-2 px-4 h-full sm:cursor-pointer"
      >
        <span className="text-gray-400">type:</span>
        <span className="text-white font-bold mx-3">
          {selectedFilter.title === ""
            ? "All"
            : toCamelCase(selectedFilter.title)}
        </span>
        <ArrowDownIcon />
      </button>
      <ul
        tabIndex={-1}
        role="listbox"
        className={`absolute left-0 -bottom-[10rem] flex flex-col w-full bg-gray-700 rounded-xl shadow-lg transition-opacity duration-100 p-2 space-y-2 sm:cursor-pointer ${
          filtersListOpen ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}
      >
        {filters.map((filter) => (
          <li
            key={filter.id}
            tabIndex={0}
            role="option"
            className={`py-2 px-3 rounded-md ${
              selectedFilter.id === filter.id
                ? "bg-blue-500"
                : "hover:bg-gray-600 transition-colors"
            }`}
            onClick={() => {
              activeTabHandler(filter.id);
              onSelectFilter(filter);
            }}
          >
            {filter.title}
          </li>
        ))}
      </ul>
    </div>
  );

  return filtersComponent;
};

export default Filters;
