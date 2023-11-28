const Search = ({ handleSubmit }) => {
  return (
    <div>
      <label
        htmlFor="default_search"
        className="mb-2 text-sm font-medium  sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={handleSubmit}
          type="search"
          id="default_search"
          name="search"
          className="block w-full p-2.5 ps-10  text-sm text-gray-900 border-gray-400 border-2 focus:border-blue-700  rounded-lg outline-none "
          placeholder="Search Sports, Politics..."
        />
      </div>
    </div>
  );
};

export default Search;
