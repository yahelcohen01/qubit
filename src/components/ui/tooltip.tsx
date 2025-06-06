import React, {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from 'react';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /**
   * Content to display inside the tooltip
   */
  content: ReactNode;

  /**
   * Position of the tooltip relative to the target element
   * @default 'top'
   */
  position?: TooltipPosition;

  /**
   * Whether to animate the tooltip's appearance
   * @default true
   */
  animated?: boolean;

  /**
   * Delay in milliseconds before showing the tooltip
   * @default 200
   */
  showDelay?: number;

  /**
   * Delay in milliseconds before hiding the tooltip
   * @default 100
   */
  hideDelay?: number;

  /**
   * Custom styling for the tooltip container
   */
  style?: CSSProperties;

  /**
   * Custom CSS class for the tooltip container
   */
  className?: string;

  /**
   * The target element that triggers the tooltip
   */
  children: React.ReactElement<any>;

  /**
   * Whether the tooltip is dark-themed
   * @default true
   */
  dark?: boolean;

  /**
   * Maximum width of the tooltip in pixels
   * @default 250
   */
  maxWidth?: number;

  /**
   * Z-index of the tooltip
   * @default 50
   */
  zIndex?: number;

  /**
   * Whether to show an arrow pointing to the target element
   * @default true
   */
  arrow?: boolean;

  /**
   * Whether to enable the tooltip
   * @default true
   */
  enabled?: boolean;

  /**
   * Whether to show the tooltip on focus
   * @default true
   */
  showOnFocus?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  animated = true,
  showDelay = 200,
  hideDelay = 100,
  style,
  className = '',
  children,
  dark = true,
  maxWidth = 250,
  zIndex = 50,
  arrow = true,
  enabled = true,
  showOnFocus = true,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  // Calculate position when tooltip or target changes or when visibility changes
  useEffect(() => {
    if (isVisible && tooltipRef.current && targetRef.current) {
      updatePosition();

      // Add resize and scroll listeners for responsive positioning
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isVisible, position, content]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) window.clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const showTooltip = () => {
    if (!enabled) return;

    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    showTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
      showTimeoutRef.current = null;
    }, showDelay);
  };

  const hideTooltip = () => {
    if (showTimeoutRef.current) {
      window.clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    hideTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      hideTimeoutRef.current = null;
    }, hideDelay);
  };

  const updatePosition = () => {
    if (!tooltipRef.current || !targetRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // Window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let x = 0;
    let y = 0;

    // Calculate base positions
    switch (position) {
      case 'top':
        x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        y = targetRect.top - tooltipRect.height - 8;
        break;
      case 'right':
        x = targetRect.right + 8;
        y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'bottom':
        x = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        y = targetRect.bottom + 8;
        break;
      case 'left':
        x = targetRect.left - tooltipRect.width - 8;
        y = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Prevent tooltip from going outside viewport
    x = Math.max(8, Math.min(windowWidth - tooltipRect.width - 8, x));
    y = Math.max(8, Math.min(windowHeight - tooltipRect.height - 8, y));

    setCoords({ x, y });
  };

  // Style classes for arrow based on position
  const getArrowClass = (): string => {
    const rawClasses = 'absolute w-2 h-2 bg-current pointer-events-none';
    const baseClasses = `${rawClasses} ${dark ? 'bg-gray-500' : 'bg-gray-200'}`;

    switch (position) {
      case 'top':
        return `${baseClasses} bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45`;
      case 'right':
        return `${baseClasses} left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45`;
      case 'bottom':
        return `${baseClasses} top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45`;
      case 'left':
        return `${baseClasses} right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45`;
      default:
        return `${baseClasses} bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45`;
    }
  };

  // Handle refs properly with callback ref pattern
  const setRefs = (instance: HTMLElement | null) => {
    // Set our internal ref
    if (instance) {
      targetRef.current = instance;
    }

    // Forward the ref if children has one
    const childRef = (children as any).ref;
    if (childRef) {
      if (typeof childRef === 'function') {
        childRef(instance);
      } else {
        childRef.current = instance;
      }
    }
  };

  // Type-safe approach to clone element
  const childProps: React.HTMLAttributes<HTMLElement> & { ref?: any } = {
    ...children.props,
    ref: setRefs,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      showTooltip();
      if (children.props.onMouseEnter) {
        (children.props.onMouseEnter as Function)(e);
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hideTooltip();
      if (children.props.onMouseLeave) {
        (children.props.onMouseLeave as Function)(e);
      }
    },
  };

  // Add focus handlers conditionally
  if (showOnFocus) {
    childProps.onFocus = (e: React.FocusEvent<HTMLElement>) => {
      showTooltip();
      if (children.props.onFocus) {
        (children.props.onFocus as Function)(e);
      }
    };

    childProps.onBlur = (e: React.FocusEvent<HTMLElement>) => {
      hideTooltip();
      if (children.props.onBlur) {
        (children.props.onBlur as Function)(e);
      }
    };
  }

  const triggerElement = React.cloneElement(children, childProps);

  return (
    <>
      {triggerElement}
      {enabled && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`
            fixed px-3 py-2 text-sm font-medium rounded-sm pointer-events-none
            ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
            ${animated ? 'transition-opacity duration-300' : ''}
            ${dark ? 'text-white bg-gray-500 dark:bg-gray-600' : 'text-gray-900 bg-white border border-gray-200'}
            ${className}
          `}
          style={{
            ...style,
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            zIndex,
            maxWidth: `${maxWidth}px`,
          }}
        >
          {content}
          {arrow && <div className={getArrowClass()} />}
        </div>
      )}
    </>
  );
};

export { Tooltip };
