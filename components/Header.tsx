"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, AuthState } from "@/lib/hooks/useAuth";
import NavbarButton from "./NavbarButton";
import { DropdownMenu, Button } from "@radix-ui/themes";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { UserCircleIcon } from "@/components/icons";

const Header = () => {
  const { user, authState, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center bg-background border-b-2 h-20 px-6 py-6">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/cropped-logo.png"
          alt="Logo"
          width={237}
          height={80}
          className="pl-[24px] pr-[24px]"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden space-x-3 md:flex justify-center items-center">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              variant="solid"
              className="flex bg-primary justify-center items-center focus:outline-none focus:ring-0 hover:text-muted md:text-sm"
            >
              Catalog
              <DropdownMenu.TriggerIcon className="ml-2" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            variant="solid"
            className="bg-primary/50 text-white border border-gray-300 shadow-md rounded-md w-auto p-2"
            align="center"
          >
            <DropdownMenu.Item
              asChild
              className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2"
            >
              <Link href="/datacenter" prefetch={true}>
                Data Center
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              asChild
              className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2"
            >
              <Link href="/compute" prefetch={true}>
                Cloud Computing
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              asChild
              className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2"
            >
              <Link href="/academy" prefetch={true}>
                AI Academy
              </Link>
            </DropdownMenu.Item>
            {user && (
              <DropdownMenu.Item
                asChild
                className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2"
              >
                <Link href="/profile" prefetch={true}>
                  Profile
                </Link>
              </DropdownMenu.Item>
            )}
            <DropdownMenu.Item
              asChild
              className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2"
            >
              <Link href="/support" prefetch={true}>
                Support
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Link
          href="/resources"
          prefetch={true}
          className="hover:text-primary md:text-sm"
        >
          Resources
        </Link>
        <Link
          href="/community"
          prefetch={true}
          className="hover:text-primary md:text-sm"
        >
          Community
        </Link>
        <Link
          href="/faqs"
          prefetch={true}
          className="hover:text-primary md:text-sm"
        >
          FAQs
        </Link>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden space-x-3 md:flex">
        {authState === AuthState.LOADING && (
          <div className="w-8 h-8 bg-neutral-200 rounded-full animate-pulse"></div>
        )}
        {authState === AuthState.UNAUTHENTICATED && (
          <>
            <NavbarButton
              bgColor="bg-white"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H12.5"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33337 14.1666L12.5 9.99992L8.33337 5.83325"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 10H2.5"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              onClick={() => router.push("/login")}
            >
              Log In
            </NavbarButton>
            <NavbarButton
              bgColor=""
              textColor="text-white"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 8V14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 11H16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </NavbarButton>
          </>
        )}
        {authState === AuthState.AUTHENTICATED && user && (
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <UserCircleIcon className="h-8 w-8 text-neutral-600 hover:text-primary" />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <div className="px-4 py-3">
                  <p className="text-sm text-neutral-700">Signed in as</p>
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user.name || user.email}
                  </p>
                </div>
                <div className="border-t border-neutral-200"></div>
                <Link
                  href="/profile"
                  prefetch={true}
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Your Profile
                </Link>
                <Link
                  href="/academy/my-courses"
                  prefetch={true}
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  My Courses
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    prefetch={true}
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 focus:outline-none"
      >
        {menuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center py-6 space-y-4 md:hidden z-50">
          <div className="space-x-3 md:flex justify-center items-center">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button
                  variant="solid"
                  className="flex bg-primary justify-center items-center focus:outline-none focus:ring-0 hover:text-muted md:text-sm"
                >
                  Catalog
                  <DropdownMenu.TriggerIcon className="ml-2" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                variant="solid"
                className="bg-primary/50 text-white border border-gray-300 shadow-md rounded-md w-auto p-2"
                align="center"
              >
                <DropdownMenu.Item className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2">
                  <Link href="/datacenter">Data Center</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2">
                  <Link href="/compute">Cloud Computing</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2">
                  <Link href="/academy">AI Academy</Link>
                </DropdownMenu.Item>
                {user && (
                  <DropdownMenu.Item className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenu.Item>
                )}
                <DropdownMenu.Item className="focus:outline-none focus:ring-0 hover:bg-gray-200 hover:text-gray-600 rounded-md px-2">
                  <Link href="/support">Support</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <Link href="/resources" className="hover:text-primary text-lg">
            Resources
          </Link>
          <Link href="/community" className="hover:text-primary text-lg">
            Community
          </Link>
          <Link href="/faqs" className="hover:text-primary text-lg">
            FAQs
          </Link>
          <div className="space-x-3 flex flex-col justify-center items-center">
            {authState === AuthState.UNAUTHENTICATED ? (
              <>
                <NavbarButton
                  bgColor=""
                  textColor="text-white"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </NavbarButton>
                <NavbarButton
                  bgColor="bg-gray"
                  onClick={() => router.push("/login")}
                >
                  Log In
                </NavbarButton>
              </>
            ) : authState === AuthState.AUTHENTICATED && user ? (
              <div className="w-full px-4">
                <div className="flex items-center mb-4">
                  <UserCircleIcon className="h-10 w-10 text-neutral-500" />
                  <div className="ml-3">
                    <div className="text-base font-medium text-neutral-800">
                      {user.name || user.email}
                    </div>
                    <div className="text-sm font-medium text-neutral-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  Your Profile
                </Link>
                <Link
                  href="/academy/my-courses"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  My Courses
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
