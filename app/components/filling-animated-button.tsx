import { cn } from "@shared/lib";
interface FillingAnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
}

export const FillingAnimatedButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
  size = "md",
  type = "button",
}: FillingAnimatedButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `
        relative overflow-hidden
        ${sizeClasses[size]}
        bg-neutral-800 backdrop-blur-lg
        text-white
        rounded-full
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `,
        className
      )}
    >
      <span
        className="
        absolute inset-0 
        bg-white 
        scale-0 
        transition-transform duration-200 ease-out
        group-hover:scale-100
        origin-center
        rounded-full
        -z-10
      "
      />

      <span className="relative z-10 transition-colors duration-200 group-hover:text-black text-base">
        {children}
      </span>
    </button>
  );
};
