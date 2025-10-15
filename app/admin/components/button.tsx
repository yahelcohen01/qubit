import { ConditionalWrapper } from "@/app/components/conditional-wrapper";
import { Tooltip } from "@/app/components/tooltip";
import { cn } from "@shared/lib";

export function Button({
  children,
  onClick,
  className,
  variant,
  disabled,
  tooltip,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  variant: "filled" | "ghost" | "danger" | "success";
  disabled?: boolean;
  tooltip?: string;
}) {
  const baseClasses = cn(
    `px-3 py-1 rounded cursor-pointer transition-colors`,
    disabled ? "opacity-50 cursor-not-allowed" : ""
  );
  const variantClasses =
    variant === "filled"
      ? "bg-neutral-800 hover:bg-neutral-700"
      : variant === "ghost"
      ? "border border-neutral-800 hover:bg-neutral-800"
      : variant === "danger"
      ? "bg-red-700 hover:bg-red-600"
      : variant === "success"
      ? "bg-green-700 text-white hover:bg-green-800"
      : "";

  return (
    <ConditionalWrapper
      condition={!!tooltip}
      wrapper={(children) => (
        <Tooltip content={tooltip} position="top" showDelay={800}>
          {children}
        </Tooltip>
      )}
    >
      <button
        onClick={onClick}
        className={cn(baseClasses, variantClasses, className)}
      >
        {children}
      </button>
    </ConditionalWrapper>
  );
}
