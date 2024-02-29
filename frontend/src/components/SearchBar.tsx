import { useState } from "react";

enum SearchType {
  Location = "Location",
  Resident = "Resident",
}

const SearchBar: React.FC<{
  onSearch: (searchTerm: string, searchType: SearchType) => void;
}> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState(SearchType.Location); // Default to searching for locations

  const handleSearch = () => {
    onSearch(searchTerm, searchType);
  };

  return (
    <div className="w-full flex flex-col items-center mt-4 mb-8">
      <div className="flex items-center mb-2">
        <input
          type="text"
          placeholder={`Search ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as SearchType)}
          className="ml-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
        >
          <option value={SearchType.Location}>Location</option>
          <option value={SearchType.Resident}>Resident</option>
        </select>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
