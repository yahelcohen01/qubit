interface SkeletonProps {
  /** Width of the skeleton - can be Tailwind class or custom value */
  width?: string;
  /** Height of the skeleton - can be Tailwind class or custom value */
  height?: string;
  /** Border radius - defaults to 'rounded' */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  /** Number of skeleton lines (for text-like skeletons) */
  lines?: number;
  /** Additional CSS classes */
  className?: string;
  /** Variant for common use cases */
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'avatar';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  rounded,
  animation = 'pulse',
  lines = 1,
  className = '',
  variant = 'rectangular',
}) => {
  // Base skeleton classes
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';

  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse', // Could be enhanced with custom wave animation
    none: '',
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  // Variant-specific configurations
  const getVariantProps = () => {
    switch (variant) {
      case 'text':
        return {
          width: width === 'w-full' ? 'w-3/4' : width,
          height: height === 'h-4' ? 'h-4' : height,
          rounded: 'sm',
        };
      case 'circular':
        return {
          width: width === 'w-full' ? 'w-12' : width,
          height: height === 'h-4' ? 'h-12' : height,
          rounded: 'full',
        };
      case 'avatar':
        return {
          width: width === 'w-full' ? 'w-16' : width,
          height: height === 'h-4' ? 'h-16' : height,
          rounded: 'full',
        };
      case 'card':
        return {
          width: width === 'w-full' ? 'w-full' : width,
          height: height === 'h-4' ? 'h-48' : height,
          rounded: 'lg',
        };
      default:
        return { width, height, rounded };
    }
  };

  const variantProps = getVariantProps();

  // Combine all classes
  const skeletonClasses = [
    baseClasses,
    animationClasses[animation],
    variantProps.width,
    variantProps.height,
    roundedClasses[variantProps.rounded as keyof typeof roundedClasses],
    className,
  ].join(' ');

  // Render multiple lines for text-like skeletons
  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={`${skeletonClasses} ${
              index === lines - 1 ? 'w-2/3' : '' // Last line is shorter
            }`}
          />
        ))}
      </div>
    );
  }

  return <div className={skeletonClasses} />;
};
