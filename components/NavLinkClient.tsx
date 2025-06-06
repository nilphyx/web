'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkClientProps extends Omit<LinkProps, 'href'> { // Omit href from LinkProps to avoid conflict if it were optional
  children: React.ReactNode;
  href: LinkProps['href']; // Explicitly define href using the type from LinkProps
  className?: string;
  activeClassName?: string;
  exact?: boolean; // If true, only active if path is an exact match
  onClick?: () => void;
}

const NavLinkClient: React.FC<NavLinkClientProps> = ({
  children,
  href,
  className = '',
  activeClassName = 'active', // Default active class
  exact = false,
  onClick,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href.toString() : pathname.startsWith(href.toString());

  const combinedClassName = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <Link href={href} className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </Link>
  );
};

export default NavLinkClient;