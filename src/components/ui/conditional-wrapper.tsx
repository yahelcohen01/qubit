import { type ReactNode, type ReactElement } from 'react';

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: ReactElement<any>) => ReactElement;
  children: ReactElement<any>;
}

/**
 * A component that conditionally wraps its children in a wrapper component
 *
 * @param condition - Whether to apply the wrapper
 * @param wrapper - The wrapper component/function to apply when condition is true
 * @param children - The content to be conditionally wrapped
 * @returns The wrapped children if condition is true, otherwise just the children
 */
export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => {
  return condition ? wrapper(children) : <>{children}</>;
};
