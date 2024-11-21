import { useSearch } from "../store/useSearch";
import CrossIcon from "@icons/cross-icon";

interface IRecentSearches {
  searches: string[];
  onAddToSearchbar: (searchQuery: string) => void;
}

export const RecentSearches = ({
  searches,
  onAddToSearchbar,
}: IRecentSearches) => {
  const removeFromRecentSearch = useSearch(
    (state) => state.removeFromRecentSearch
  );
  return (
    <div className="flex flex-col w-full z-50">
      <h5 className="text-2xl text-left font-bold mb-5">Recent Searches</h5>
      <ul className="flex flex-wrap gap-x-2 gap-y-3">
        {searches.map((search, i) => (
          <li
            key={i}
            className="flex items-center bg-gray-900 rounded-full px-5 py-2.5 sm:cursor-pointer"
            onClick={() => onAddToSearchbar(search)}
          >
            <span>{search}</span>
            <CrossIcon
              className="w-4 h-4 ml-3"
              onClick={(e) => {
                e.stopPropagation();
                removeFromRecentSearch(search);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
