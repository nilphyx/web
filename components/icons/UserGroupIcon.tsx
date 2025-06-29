import React from 'react';

export const UserGroupIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="user-group-icon"
    {...props}
  >
    <circle cx="7" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3.5 18c0-2.5 3-4 5.5-4s5.5 1.5 5.5 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13 18c0-1.5 2-2.5 4-2.5s4 1 4 2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Add this to your global CSS or module CSS
/*
.user-group-icon {
  animation: float 2.5s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
*/
