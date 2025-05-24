import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown, ChevronUp, Filter, Plus } from 'lucide-react';

// Define types for our data
type AssetType = 'article' | 'academic' | 'blog' | 'video' | 'case-study';

interface Asset {
  id: string;
  title: string;
  type: AssetType;
  category: string;
  description?: string;
  location?: string;
  level?:
    | 'Basic'
    | 'Intermediate'
    | 'Advanced'
    | 'Professional'
    | 'Entry Level';
  team?: string;
}

interface FilterOption {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

interface FilterGroup {
  id: string;
  name: string;
  isOpen: boolean;
  options: FilterOption[];
}

// Sample data
const sampleAssets: Asset[] = [
  {
    id: '1',
    title: 'AI Engineer',
    type: 'article',
    category: 'Software Engineering',
    location: 'BANGALORE, IN',
    level: 'Professional',
    team: 'Engineering',
  },
  {
    id: '2',
    title: 'CSM AI Engineer',
    type: 'article',
    category: 'Sales',
    location: 'RIYADH, SA',
    level: 'Entry Level',
    team: 'Sales',
  },
  {
    id: '3',
    title: 'AI engineer',
    type: 'blog',
    category: 'Sales',
    location: 'New Delhi, IN',
    level: 'Professional',
    team: 'Sales',
  },
  {
    id: '4',
    title: 'AI Engineer',
    type: 'article',
    category: 'Sales',
    location: 'BANGALORE, IN',
    level: 'Professional',
    team: 'Sales',
  },
  {
    id: '5',
    title: 'Developer AI Center of Excellence',
    type: 'academic',
    category: 'Infrastructure & Technology',
    location: 'BANGALORE, IN',
    level: 'Professional',
    team: 'Infrastructure',
  },
  {
    id: '6',
    title: 'AI Cloud Engineer AWS / Azure',
    type: 'case-study',
    category: 'Data & Analytics',
    location: 'BANGALORE, IN',
    level: 'Professional',
    team: 'Data Science',
  },
];

// Initial filter groups
const initialFilterGroups: FilterGroup[] = [
  {
    id: 'type',
    name: 'Asset Type',
    isOpen: true,
    options: [
      { id: 'article', label: 'Articles', count: 3, checked: false },
      { id: 'academic', label: 'Academic Papers', count: 1, checked: false },
      { id: 'blog', label: 'Blog Posts', count: 1, checked: false },
      { id: 'case-study', label: 'Case Studies', count: 1, checked: false },
    ],
  },
  {
    id: 'team',
    name: 'Team',
    isOpen: true,
    options: [
      { id: 'engineering', label: 'Engineering', count: 1, checked: false },
      { id: 'sales', label: 'Sales', count: 3, checked: false },
      {
        id: 'infrastructure',
        label: 'Infrastructure',
        count: 1,
        checked: false,
      },
      { id: 'data-science', label: 'Data Science', count: 1, checked: false },
    ],
  },
  {
    id: 'level',
    name: 'Experience level',
    isOpen: true,
    options: [
      { id: 'professional', label: 'Professional', count: 5, checked: false },
      { id: 'entry-level', label: 'Entry Level', count: 1, checked: false },
    ],
  },
  {
    id: 'location',
    name: 'Location',
    isOpen: true,
    options: [
      { id: 'bangalore', label: 'Bangalore, IN', count: 4, checked: false },
      { id: 'riyadh', label: 'Riyadh, SA', count: 1, checked: false },
      { id: 'new-delhi', label: 'New Delhi, IN', count: 1, checked: false },
    ],
  },
];

// Component for the search bar
const SearchBar: React.FC<{
  query: string;
  setQuery: (query: string) => void;
}> = ({ query, setQuery }) => {
  return (
    <div className="relative w-full mb-4">
      <div className="relative flex items-center">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

// Component for filters
const FilterSidebar: React.FC<{
  filterGroups: FilterGroup[];
  setFilterGroups: React.Dispatch<React.SetStateAction<FilterGroup[]>>;
  isMobile: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  filterGroups,
  setFilterGroups,
  isMobile,
  isFilterOpen,
  setIsFilterOpen,
}) => {
  const toggleFilterGroup = (groupId: string) => {
    setFilterGroups(
      filterGroups.map((group) =>
        group.id === groupId ? { ...group, isOpen: !group.isOpen } : group,
      ),
    );
  };

  const toggleFilterOption = (groupId: string, optionId: string) => {
    setFilterGroups(
      filterGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              options: group.options.map((option) =>
                option.id === optionId
                  ? { ...option, checked: !option.checked }
                  : option,
              ),
            }
          : group,
      ),
    );
  };

  if (isMobile && !isFilterOpen) {
    return null;
  }

  return (
    <div
      className={`${isMobile ? 'absolute top-0 left-0 w-full h-full bg-white z-10' : 'w-64'} p-4 border-r`}
    >
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {filterGroups.map((group) => (
        <div key={group.id} className="mb-6">
          <button
            onClick={() => toggleFilterGroup(group.id)}
            className="flex justify-between items-center w-full text-left font-medium mb-2"
          >
            {group.name}
            {group.isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {group.isOpen && (
            <div className="space-y-2">
              {group.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${group.id}-${option.id}`}
                    checked={option.checked}
                    onChange={() => toggleFilterOption(group.id, option.id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`${group.id}-${option.id}`}
                    className="text-sm"
                  >
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Component for each asset card
const AssetCard: React.FC<{ asset: Asset }> = ({ asset }) => {
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col">
      <div className="p-4 flex-grow">
        <div className="text-sm text-gray-600 mb-1">{asset.category}</div>
        <h3 className="text-lg font-medium mb-4">{asset.title}</h3>

        <div className="mt-auto">
          <div className="text-sm mb-1">{asset.level}</div>
          <div className="text-sm text-gray-700">{asset.location}</div>
        </div>
      </div>
      <div className="border-t p-4">
        <button className="text-blue-600 hover:text-blue-800">
          <span className="flex items-center">
            <span className="mr-2">→</span>
          </span>
        </button>
      </div>
    </div>
  );
};

// Component for results display
const ResultsDisplay: React.FC<{
  assets: Asset[];
  totalCount: number;
  sortOption: string;
  setSortOption: (option: string) => void;
}> = ({ assets, totalCount, sortOption, setSortOption }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          {assets.length > 0
            ? `1 – ${Math.min(assets.length, 30)} of ${totalCount} items`
            : `0 of ${totalCount} items`}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center">
            <label htmlFor="itemsPerPage" className="mr-2 text-sm">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              className="border rounded-md py-1 pl-2 pr-8 text-sm appearance-none"
            >
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          <div className="relative flex items-center">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-md py-1 pl-2 pr-8 text-sm appearance-none"
            >
              <option value="relevance">Most Relevant</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">A to Z</option>
              <option value="z-a">Z to A</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

// Main Knowledge Base Component
export const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroups, setFilterGroups] =
    useState<FilterGroup[]>(initialFilterGroups);
  const [sortOption, setSortOption] = useState('relevance');
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(sampleAssets);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen size is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Filter assets based on search query and selected filters
  useEffect(() => {
    let result = sampleAssets;

    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        (asset) =>
          asset.title.toLowerCase().includes(lowerCaseQuery) ||
          asset.category.toLowerCase().includes(lowerCaseQuery) ||
          (asset.description &&
            asset.description.toLowerCase().includes(lowerCaseQuery)),
      );
    }

    // Apply checkbox filters
    filterGroups.forEach((group) => {
      const selectedOptions = group.options.filter((option) => option.checked);

      if (selectedOptions.length > 0) {
        result = result.filter((asset) => {
          // Map the asset's property to the corresponding filter group
          let assetProperty: string | undefined;

          switch (group.id) {
            case 'type':
              assetProperty = asset.type;
              break;
            case 'team':
              assetProperty = asset.team?.toLowerCase();
              break;
            case 'level':
              assetProperty = asset.level?.toLowerCase();
              break;
            case 'location':
              assetProperty = asset.location?.toLowerCase();
              break;
            default:
              return true;
          }

          return selectedOptions.some((option) =>
            assetProperty?.includes(option.id.toLowerCase()),
          );
        });
      }
    });

    // Sort the results
    switch (sortOption) {
      case 'newest':
        // In a real app, you would sort by date
        break;
      case 'oldest':
        // In a real app, you would sort by date
        break;
      case 'a-z':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-a':
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // 'relevance' - no additional sorting needed
        break;
    }

    setFilteredAssets(result);
  }, [searchQuery, filterGroups, sortOption]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Knowledge Base</h1>
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      </div>

      <div className="flex flex-col md:flex-row">
        {isMobile && (
          <button
            onClick={() => setIsFilterOpen(true)}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <Filter size={16} className="mr-2" />
            <span>Filter by</span>
            <Plus size={16} className="ml-auto" />
          </button>
        )}

        {/* Filter sidebar */}
        <FilterSidebar
          filterGroups={filterGroups}
          setFilterGroups={setFilterGroups}
          isMobile={isMobile}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        {/* Main content area */}
        <div className={`${isMobile ? 'w-full' : 'ml-8 flex-grow'}`}>
          <ResultsDisplay
            assets={filteredAssets}
            totalCount={sampleAssets.length}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
      </div>
    </div>
  );
};
