import { useState, useEffect } from 'react';
import { Search, Close, Filter, Add } from '@carbon/icons-react';
import { FilterSidebar } from './filter-sidebar';
import type { Asset } from '@/types';
import { AssestsGrid } from './assets-grid';
import ScrodingersCat from '@root/public/schrodinger-cat.png';

export interface FilterOption {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

export interface FilterGroup {
  id: keyof Asset;
  name: string;
  isOpen: boolean;
  options: FilterOption[];
}

// Sample data
const sampleAssets: Asset[] = [
  {
    id: '1',
    title: 'The Feynman Lectures',
    type: 'academic',
    category: 'Quantum Physics',
    level: 'Entry Level',
    readingTime: '2 - 4 hours',
    date: '01-04-2025',
    description:
      'A comprehensive introduction to quantum physics by Richard Feynman.',
  },
  {
    id: '2',
    title: 'פריצת דרך ישראלית משנה את עולם המחשוב הקוונטי',
    type: 'article',
    category: 'Quantum Computing',
    level: 'Basic',
    readingTime: '2 minutes',
    date: '2025-04-01',
    description:
      'An article discussing a breakthrough in quantum computing technology',
  },
  {
    id: '3',
    title: 'התחלה קלה - באלי ללמוד קוונטים',
    type: 'blog',
    category: 'Quantum Computing',
    level: 'Entry Level',
    readingTime: '5 minutes',
    date: '2025-04-01',
    description:
      'A beginner-friendly blog post introducing the basics of quantum computing.',
  },
  {
    id: '4',
    title: "But what is quantum computing? (Grover's Algorithm)",
    type: 'video',
    category: 'Quantum Computing',
    level: 'Basic',
    authors: ['3Blue1Brown'],
    date: '2025-03-23',
    description: "A video explaining Grover's Algorithm in quantum computing.",
  },
  {
    id: '5',
    title: 'Quantum Computing for Computer Scientists',
    type: 'case-study',
    category: 'Quantum Computing',
    level: 'Intermediate',
    readingTime: '1 hour',
    date: '2025-04-01',
    description:
      'A case study on the applications of quantum computing in computer science.',
  },
  {
    id: '6',
    title: 'Quantum Mechanics and Quantum Computing',
    type: 'academic',
    category: 'Quantum Physics',
    level: 'Advanced',
    readingTime: '3 hours',
    date: '2025-04-01',
    description:
      'An academic paper discussing the relationship between quantum mechanics and quantum computing.',
  },
  {
    id: '7',
    title: 'Understanding Quantum Entanglement',
    type: 'article',
    category: 'Quantum Physics',
    level: 'Professional',
    readingTime: '4 hours',
    date: '2025-04-01',
    description:
      'An in-depth article on quantum entanglement and its implications in quantum computing.',
  },
  {
    id: '8',
    title: 'The Future of Quantum Computing in AI',
    type: 'blog',
    category: 'AI and Quantum Computing',
    level: 'Basic',
    readingTime: '10 minutes',
    date: '2025-04-01',
    description:
      'A blog post exploring the intersection of AI and quantum computing.',
  },
  {
    id: '9',
    title: "Quantum Computing: A Beginner's Guide",
    type: 'academic',
    category: 'Quantum Computing',
    level: 'Entry Level',
    readingTime: '1 hour',
    date: '2025-04-01',
    description:
      'An academic guide for beginners to understand the basics of quantum computing.',
  },
  {
    id: '10',
    title: 'Quantum Algorithms for Beginners',
    type: 'video',
    category: 'Quantum Computing',
    level: 'Intermediate',
    authors: ['QuantumTech'],
    date: '2025-04-01',
    description: 'A beginner-friendly introduction to quantum algorithms.',
  },
];

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
      { id: 'video', label: 'Video', count: 1, checked: false },
    ],
  },
  {
    id: 'level',
    name: 'Level',
    isOpen: true,
    options: [
      { id: 'entry-level', label: 'Entry level', count: 3, checked: false },
      { id: 'basic', label: 'Basic', count: 1, checked: false },
      { id: 'intermediate', label: 'Intermediate', count: 1, checked: false },
      { id: 'advanced', label: 'Advanced', count: 1, checked: false },
      { id: 'professional', label: 'Professional', count: 1, checked: false },
    ],
  },
];

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
        result = [...result].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case 'oldest':
        result = [...result].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
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
    <div className="max-w-screen mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">KNOWLEDGE BASE</h1>

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
            <Add size={20} className="ml-auto" />
          </button>
        )}

        <FilterSidebar
          filterGroups={filterGroups}
          setFilterGroups={setFilterGroups}
          isMobile={isMobile}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          assets={sampleAssets}
        />

        {filteredAssets.length > 0 ? (
          <div className={`${isMobile ? 'w-full' : 'ml-8 grow'}`}>
            <AssestsGrid
              assets={filteredAssets}
              totalCount={sampleAssets.length}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
        ) : (
          <div className="flex flex-col grow justify-center items-center text-center p-8 gap-4">
            <img
              src={ScrodingersCat}
              alt="No results found"
              className="w-xs sm:w-sm mb-4"
            />
            <h1 className="text-4xl font-bold mb-2">No Results Found</h1>
            <p className="text-lg text-gray-500">
              No results found for your search. Try adjusting your filters or
              search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => {
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
            <Close size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
