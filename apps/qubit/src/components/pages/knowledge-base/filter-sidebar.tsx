import type { FilterGroup } from './knowledge-base';
import type { Asset, SetStateAction } from '@types';
import {
  Accordion,
  AccordionButton,
  AccordionPanel,
  ConditionalWrapper,
  Dialog,
  Checkbox,
} from '@ui';
import { cn } from '@utils';

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
  const toggleFilterOption = (groupId: string, optionId: string) => {
    setFilterGroups(
      filterGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              options: group.options.map((option) =>
                option.id === optionId
                  ? { ...option, checked: !option.checked }
                  : option
              ),
            }
          : group
      )
    );
  };

  if (isMobile && !isFilterOpen) {
    return null;
  }

  return (
    <div className="min-w-3xs w-3xs p-4 border-r sticky top-20 h-screen overflow-y-auto">
      <ConditionalWrapper
        condition={isMobile}
        wrapper={(children) => (
          <Dialog
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            title="Filters"
            description="Select filters to narrow down your search"
            fullscreen
            position="top"
            showCloseButton
            closeOnOverlayClick
          >
            {children}
          </Dialog>
        )}
      >
        <>
          {filterGroups.map((group) => {
            return (
              <Accordion
                key={String(group.id)}
                defaultOpen={group.isOpen}
                className="mb-4"
              >
                <AccordionButton
                  className={cn(
                    'flex justify-between items-center w-full text-left font-medium',
                    isFilterOpen && 'px-0'
                  )}
                >
                  {group.name}
                </AccordionButton>
                <AccordionPanel className="space-y-2">
                  {group.options.map((option) => (
                    <div key={String(option.id)} className="flex items-center">
                      <Checkbox
                        id={`${String(group.id)}-${String(option.id)}`}
                        checked={option.checked}
                        onChange={() =>
                          toggleFilterOption(
                            String(group.id),
                            String(option.id)
                          )
                        }
                        className="mr-2"
                        label={`${option.label} (${getAssetFilterCount({
                          assets,
                          filterId: group.id as keyof Asset,
                          filterValue: String(option.id),
                        })})`}
                      />
                    </div>
                  ))}
                </AccordionPanel>
              </Accordion>
            );
          })}
        </>
      </ConditionalWrapper>
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
    let assetProperty: string | undefined;

    switch (filterId) {
      case 'type':
        assetProperty = String(asset.type);
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
