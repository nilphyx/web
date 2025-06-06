'use client';

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean; // For using with Next.js Link
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled,
  className = '',
  fullWidth = false,
  asChild = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150';

  const variantStyles = {
    primary: 'bg-primary text-background hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-green-700 focus:ring-secondary',
    danger: 'bg-danger text-white hover:bg-red-700 focus:ring-danger',
    ghost: 'text-primary hover:bg-primary-dark/10 focus:ring-primary',
    outline: 'border border-primary text-primary hover:bg-primary-dark/10 focus:ring-primary',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const loadingStyles = isLoading ? 'opacity-75 cursor-not-allowed' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const widthStyles = fullWidth ? 'w-full' : '';

  const Tag = asChild ? 'span' : 'button'; // Render a span if asChild is true to let NextLink handle the <a>

  return (
    <Tag
      type={asChild ? undefined : (props.type || "button")} // Only set type if it's a button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${loadingStyles} ${disabledStyles} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      {...(asChild ? {} : props)} // Spread props only if it's a real button
      // For asChild, the props like onClick should be on the Link component itself
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
    </Tag>
  );
};