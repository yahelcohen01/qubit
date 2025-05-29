import type { Asset } from '@types';
import { ChevronDown } from '@carbon/icons-react';
import { AssetCard } from './asset-card';

export const AssestsGrid = ({
  assets,
  totalCount,
  sortOption,
  setSortOption,
}: {
  assets: Asset[];
  totalCount: number;
  sortOption: string;
  setSortOption: (option: string) => void;
}) => {
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
