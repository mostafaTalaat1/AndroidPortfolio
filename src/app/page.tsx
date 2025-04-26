"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );

    tl.fromTo(
      ".cta-button",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
      "-=0.4"
    );

    gsap.to(".grid-pattern", {
      backgroundPosition: "40px 40px",
      duration: 10,
      repeat: -1,
      ease: "linear",
    });

    const dotsContainer = document.querySelector(".dots-animation");
    if (dotsContainer) {
      for (let i = 0; i < 50; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        const size = Math.random() * 2 + 1;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 5}s`;
        dotsContainer.appendChild(dot);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#040414] text-white overflow-hidden relative">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="dots-animation absolute inset-0 z-0" />

      <Navbar />

      <div
        ref={containerRef}
        className="container mx-auto px-6 pt-36 pb-20 h-screen flex flex-col justify-center relative z-10 page-transition"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 cyber-font gradient-text"
          >
            Android & JavaFX <br />
            <span className="text-stroke">Developer</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-300 mb-12 exospace-font"
          >
            5+ years of experience building beautiful & functional <br />
            Android applications and desktop JavaFX software.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            <Link
              href="/projects"
              className="cta-button hover-text btn border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-md transition-all duration-300 backdrop-blur-sm"
            >
              View Projects
              <Image
                src="/images/arrowPoint.svg"
                alt="Arrow"
                width={16}
                height={16}
                className="inline ml-2"
              />
            </Link>

            <Link
              href="/tutorials"
              className="cta-button hover-text btn border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-md transition-all duration-300 backdrop-blur-sm"
            >
              Tutorials
              <Image
                src="/images/arrowPoint.svg"
                alt="Arrow"
                width={16}
                height={16}
                className="inline ml-2"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
