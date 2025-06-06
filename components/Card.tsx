import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  imageUrl?: string;
  imageAlt?: string;
  actions?: React.ReactNode; // For buttons or links at the bottom of the card
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  imageUrl,
  imageAlt = 'Card image',
  actions,
  onClick,
}) => {
  return (
    <div
      className={`bg-background shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      aria-label={title || 'Card element'}
    >
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img className="w-full h-full object-cover" src={imageUrl} alt={imageAlt} />
        </div>
      )}
      <div className="p-6">
        {title && <h3 className="text-xl font-semibold text-neutral-800 mb-2">{title}</h3>}
        <div className="text-neutral-600 text-sm">
          {children}
        </div>
      </div>
      {actions && (
        <div className="p-6 pt-0 border-t border-neutral-200 mt-auto">
          {actions}
        </div>
      )}
    </div>
  );
};
