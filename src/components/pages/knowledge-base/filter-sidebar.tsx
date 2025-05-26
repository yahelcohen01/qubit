import { ChevronDown, ChevronUp, Close } from '@carbon/icons-react';
import type { FilterGroup } from './knowledge-base';
import type { Asset, SetStateAction } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionButton, AccordionPanel } from '@/components/ui';

export const FilterSidebar = ({
  filterGroups,
  setFilterGroups,
  isMobile,
  isFilterOpen,
  setIsFilterOpen,
  assets,
}: {
  filterGroups: FilterGroup[];
  setFilterGroups: SetStateAction<FilterGroup[]>;
  isMobile: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: SetStateAction<boolean>;
  assets: Asset[];
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
      className={`${isMobile ? 'absolute top-0 left-0 w-full h-full bg-white z-10' : 'min-w-3xs w-3xs'} p-4 border-r`}
    >
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Close size={20} />
          </button>
        </div>
      )}

      {filterGroups.map((group) => {
        return (
          <Accordion key={group.id} defaultOpen={group.isOpen} className="mb-4">
            <AccordionButton className="flex justify-between items-center w-full text-left font-medium">
              {group.name}
            </AccordionButton>
            <AccordionPanel className="space-y-2">
              {group.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <Checkbox
                    id={`${group.id}-${option.id}`}
                    checked={option.checked}
                    onChange={() => toggleFilterOption(group.id, option.id)}
                    className="mr-2"
                    label={`${option.label} (${getAssetFilterCount({
                      assets,
                      filterId: group.id,
                      filterValue: option.id,
                    })})`}
                  />
                </div>
              ))}
            </AccordionPanel>
          </Accordion>
        );
      })}

      {/* {filterGroups.map((group) => (
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
                  <Checkbox
                    id={`${group.id}-${option.id}`}
                    checked={option.checked}
                    onChange={() => toggleFilterOption(group.id, option.id)}
                    className="mr-2"
                    label={`${option.label} (
                    ${getAssetFilterCount({
                      assets,
                      filterId: group.id,
                      filterValue: option.id,
                    })}
                    )`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))} */}
    </div>
  );
};

const getAssetFilterCount = ({
  assets,
  filterId,
  filterValue,
}: {
  assets: Asset[];
  filterId: keyof Asset;
  filterValue: string;
}) => {
  return assets.filter((asset) => {
    // Map the asset's property to the corresponding filter group
    let assetProperty: string | undefined;

    switch (filterId) {
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
        return false;
    }

    return assetProperty?.toLowerCase() === filterValue.toLowerCase();
  }).length;
};
