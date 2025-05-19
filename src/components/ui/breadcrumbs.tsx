import React, { Fragment } from 'react';
import { ChevronRight, Home } from '@carbon/icons-react';
import { Link, useRouterState } from '@tanstack/react-router';

/**
 * Breadcrumb item type
 */
export interface BreadcrumbItem {
  /** The display text for the breadcrumb */
  label: string;
  /** Optional path for navigation (if not provided, item is not clickable) */
  path?: string;
  /** Whether this is the current/active breadcrumb */
  current?: boolean;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
}

/**
 * Props for the Breadcrumbs component
 */
export interface BreadcrumbsProps {
  /** Manually provided breadcrumb items */
  items?: BreadcrumbItem[];
  /** Whether to auto-generate breadcrumbs from router state */
  autoGenerate?: boolean;
  /** Whether to show home icon for the first item */
  showHomeIcon?: boolean;
  /** Custom separator between items */
  separator?: React.ReactNode;
  /** Label for the home breadcrumb */
  homeLabel?: string;
  /** Path for the home breadcrumb */
  homePath?: string;
  /** Optional callback when a breadcrumb is clicked */
  onBreadcrumbClick?: (item: BreadcrumbItem, e: React.MouseEvent) => void;
  /** Additional CSS class for the container */
  className?: string;
  /** Classes for breadcrumb items */
  itemClassName?: {
    /** Base class for all items */
    base?: string;
    /** Class for the active/current item */
    active?: string;
    /** Class for inactive/non-current items */
    inactive?: string;
  };
  /** Class for separator elements */
  separatorClassName?: string;
}

/**
 * Props for the BreadcrumbItem component
 */
interface BreadcrumbItemProps {
  item: BreadcrumbItem;
  isFirst: boolean;
  showHomeIcon: boolean;
  onBreadcrumbClick?: (item: BreadcrumbItem, e: React.MouseEvent) => void;
  isClickable: boolean;
}

/**
 * A versatile breadcrumbs component that supports manual items or auto-generation from router
 */
export const Breadcrumbs = ({
  items = [],
  autoGenerate = false,
  showHomeIcon = true,
  separator = <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />,
  homeLabel = 'Home',
  homePath = '/',
  onBreadcrumbClick,
  className = '',
  itemClassName = {
    base: 'text-sm font-normal',
    active: 'text-gray-500',
    inactive: 'text-gray-500 hover:text-blue-800',
  },
  separatorClassName = 'mx-2 flex-shrink-0',
}: BreadcrumbsProps) => {
  const routerState = useRouterState();

  // Auto-generate breadcrumbs from router state if requested
  const breadcrumbItems = autoGenerate
    ? generateBreadcrumbsFromRouter(routerState, homeLabel, homePath)
    : [...items]; // Create a copy to avoid mutating props

  // If no items and not auto-generating, don't render anything
  if (breadcrumbItems.length === 0) {
    return null;
  }

  // Ensure the last item is marked as current if not explicitly set
  if (breadcrumbItems.length > 0) {
    const lastIndex = breadcrumbItems.length - 1;
    if (breadcrumbItems[lastIndex].current === undefined) {
      breadcrumbItems[lastIndex] = {
        ...breadcrumbItems[lastIndex],
        current: true,
      };
    }
  }

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumbs">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isCurrent = item.current === true;

          return (
            <Fragment key={index}>
              <li
                className={`flex items-center ${itemClassName.base || ''} ${isCurrent ? itemClassName.active || '' : itemClassName.inactive || ''}`}
              >
                <BreadcrumbItem
                  item={item}
                  isFirst={index === 0}
                  showHomeIcon={showHomeIcon}
                  onBreadcrumbClick={onBreadcrumbClick}
                  isClickable={!!item.path && !isCurrent}
                />
              </li>

              {!isLast && (
                <li className={separatorClassName} aria-hidden="true">
                  {separator}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Individual breadcrumb item renderer
 */
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  item,
  isFirst,
  showHomeIcon,
  onBreadcrumbClick,
  isClickable,
}) => {
  const { label, path, icon } = item;

  // Determine the content with optional home icon
  const content = (
    <span className="flex items-center">
      {isFirst && showHomeIcon && !icon ? (
        <Home className="mr-1 h-4 w-4 flex-shrink-0" />
      ) : icon ? (
        <span className="mr-1">{icon}</span>
      ) : null}
      {label}
    </span>
  );

  // Handle the click, calling the custom handler if provided
  const handleClick = (e: React.MouseEvent) => {
    if (onBreadcrumbClick) {
      onBreadcrumbClick(item, e);
    }
  };

  // Return either a link or a span based on whether the item is clickable
  if (isClickable && path) {
    return (
      <Link to={path} onClick={handleClick} className="hover:underline">
        {content}
      </Link>
    );
  }

  return (
    <span aria-current={item.current ? 'page' : undefined}>{content}</span>
  );
};

/**
 * Helper function to generate breadcrumbs from router state
 */
function generateBreadcrumbsFromRouter(
  routerState: any,
  homeLabel: string,
  homePath: string,
): BreadcrumbItem[] {
  // Get the current path segments
  const { location } = routerState;
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Start with home
  const breadcrumbs: BreadcrumbItem[] = [{ label: homeLabel, path: homePath }];

  // Build up the breadcrumbs based on path segments
  let currentPath = '';
  pathSegments.forEach((segment: string, index: number) => {
    currentPath += `/${segment}`;

    // Format the segment for display (capitalize, replace dashes with spaces)
    const formattedLabel = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    breadcrumbs.push({
      label: formattedLabel,
      path: currentPath,
      current: index === pathSegments.length - 1,
    });
  });

  return breadcrumbs;
}
