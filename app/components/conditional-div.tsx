"use client";
import { ComponentProps } from "react";

type ConditionalDivProps = {
  condition: boolean;
  children?: React.ReactNode;
} & ComponentProps<"div">;

export const ConditionalDiv = ({ ...props }: ConditionalDivProps) => {
  const { condition, children, ...rest } = props;
  return condition ? <div {...rest}>{children}</div> : null;
};
