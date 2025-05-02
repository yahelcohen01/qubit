import React from 'react';
import { Loader2 } from 'lucide-react';

// Define button variants and types
export type ButtonVariant =
  | 'text' // Low emphasis
  | 'outlined' // Medium emphasis
  | 'contained' // High emphasis
  | 'error' // Red background
  | 'warn' // Yellow background
  | 'ok'; // Green background

// Props interface for the Button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  leftLogo?: React.ReactNode;
  rightLogo?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'text',
  loading = false,
  disabled = false,
  leftLogo,
  rightLogo,
  className = '',
  children,
  ...rest
}) => {
  // Base styling for all buttons
  const baseStyles =
    'flex items-center justify-center gap-2 rounded font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 cursor-pointer disabled:cursor-not-allowed py-2 px-4';

  // Variant-specific styling
  const variantStyles = {
    // Main variants with black/gray palette
    text: ' hover:bg-gray-300 text-secondary',
    outlined:
      'border border-secondary text-secondary hover:bg-secondary hover:text-white',
    contained: 'bg-gray-800 text-white hover:bg-gray-700 shadow-sm',

    // Additional color variants
    error: 'bg-red-700 bg-opacity-90 text-white hover:bg-opacity-80 shadow-sm',
    warn: 'bg-yellow-500 bg-opacity-90 text-gray-900 hover:bg-opacity-80 shadow-sm',
    ok: 'bg-green-700  text-white hover:bg-opacity-80 shadow-sm',
  };

  // Disabled styling
  const disabledStyles = {
    text: 'hover:bg-gray-300 text-secondary opacity-50',
    outlined:
      'hover:bg-gray-200 text-secondary opacity-50 border border-secondary',
    contained: 'bg-gray-300 text-gray-500 hover:bg-gray-300 shadow-none',
    error: 'bg-gray-300 text-gray-700  shadow-none',
    warn: 'bg-yellow-200 text-gray-500 hover:bg-yellow-200 shadow-none',
    ok: 'bg-green-200 text-gray-500 hover:bg-green-200 shadow-none',
  };

  // Combine styles based on props
  const buttonStyles = `
    ${baseStyles} 
    ${loading || disabled ? disabledStyles[variant] : variantStyles[variant]}
    ${className}
  `;

  return (
    <button className={buttonStyles} disabled={loading || disabled} {...rest}>
      {loading && <Loader2 className="size-5 animate-spin" />}
      {!loading && leftLogo && (
        <span className="flex-shrink-0">{leftLogo}</span>
      )}
      <span>{children}</span>
      {rightLogo && <span className="flex-shrink-0">{rightLogo}</span>}
    </button>
  );
};
