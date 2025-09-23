import { type ReactElement } from "react";

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: ReactElement<any>) => ReactElement;
  children: ReactElement<any>;
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => {
  return condition ? wrapper(children) : <>{children}</>;
};
