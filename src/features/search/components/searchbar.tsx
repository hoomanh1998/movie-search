import React, { useState } from "react";
import SearchIcon from "@icons/search-icon";
import ClearIcon from "@icons/circle-x-icon";

interface ISearchbar {
  ref: React.MutableRefObject<HTMLInputElement>;
  query: string;
  onSearchMovie: () => void;
  onClearInput: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

type Searchbar = ISearchbar & React.InputHTMLAttributes<HTMLInputElement>;

export const Searchbar = React.forwardRef<HTMLInputElement, Searchbar>(
  ({ query, onChange, onKeyDown, onClearInput, onSearchMovie }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    return (
      <div className="relative flex flex-row shrink-0 justify-center sm:max-w-md w-full">
        <input
          autoComplete="off"
          name="Searchbar"
          className="input bg-gray-900 focus:ring-blue-500 text-white w-full"
          type="text"
          value={query}
          placeholder="Search movie, series, tv shows title..."
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
        />
        <div className="flex flex-row items-center space-x-3 absolute right-4 top-1/2 transform -translate-y-1/2">
          {query.length > 0 && (
            <ClearIcon show={query.length > 0} onClick={onClearInput} />
          )}
          <SearchIcon
            active={isFocused}
            onClick={() => query.length > 0 && onSearchMovie()}
          />
        </div>
      </div>
    );
  }
);
