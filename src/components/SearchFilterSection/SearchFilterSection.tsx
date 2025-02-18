import { Song } from "../../types";

interface SearchFilterSectionProps {
  filter: string;
  setFilter: (filter: string) => void;
  sortKey: keyof Song;
  setSortKey: (sortKey: keyof Song) => void;
  userRole: { role: string };
  setIsModalOpen: (isOpen: boolean) => void;
}

function SearchFilterSection({
  filter,
  setFilter,
  sortKey,
  setSortKey,
  userRole,
  setIsModalOpen,
}: SearchFilterSectionProps) {
  return (
    <div className="search-filter-section mb-4">
      <div className="filters flex flex-row sm:flex-row gap-4 items-center">
        <div className="flex-2">
          <input
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Filter songs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex-2">
          <select
            className="border border-gray-300 p-2 rounded-md w-full"
            value={sortKey as string}
            onChange={(e) => setSortKey(e.target.value as keyof Song)}
          >
            <option value="title">Sort By - Title</option>
            <option value="artist">Sort By - Artist</option>
            <option value="album">Sort By - Album</option>
          </select>
        </div>
        {userRole.role === "admin" && (
          <div className="flex-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-500 text-white p-2 rounded-md w-full"
            >
              Add New Song
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFilterSection;
