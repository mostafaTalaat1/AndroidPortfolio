"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tl = gsap.timeline();

    tl.fromTo(
      ".nav-logo",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      ".nav-item",
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }, []);

  // We need pathname here to detect route changes and close menu
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally using pathname
  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full z-50 px-4 py-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="hover-text nav-logo">
          <div className="relative h-10 w-32">
            <Image
              src="/images/logo.svg"
              alt="MoreTech Logo"
              width={120}
              height={35}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-item hover-text text-sm uppercase tracking-wider transition-all duration-300 ${
                pathname === link.href
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden hover-text"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="space-y-2">
            <span
              className={`block w-8 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            />
            <span
              className={`block w-8 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-8 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-95 z-40 transition-all duration-500 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover-text py-4 text-2xl uppercase tracking-wider transition-all duration-300 ${
                pathname === link.href
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
