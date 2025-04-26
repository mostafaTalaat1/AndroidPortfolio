"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";

// Skills data
const skills = [
  {
    category: "Android Development",
    items: [
      "Java",
      "Kotlin",
      "Android SDK",
      "Jetpack Compose",
      "Firebase",
      "Room",
      "Retrofit",
      "MVVM",
      "Material Design",
    ],
  },
  {
    category: "Desktop Development",
    items: [
      "JavaFX",
      "Scene Builder",
      "FXML",
      "Java",
      "SQL Databases",
      "UI/UX Design",
    ],
  },
  {
    category: "Other Skills",
    items: [
      "Git",
      "RESTful APIs",
      "Firebase",
      "SQLite",
      "Room Database",
      "Multi-threading",
      "Design Patterns",
    ],
  },
];

export default function AboutPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    tl.fromTo(headingRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 });

    tl.fromTo(
      bioRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.5"
    );

    tl.fromTo(
      ".skill-category",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2 },
      "-=0.3"
    );

    tl.fromTo(
      ".skill-item",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.05 },
      "-=0.5"
    );
  }, []);

  return (
    <main className="min-h-screen bg-[#040414] text-white">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="dots-animation absolute inset-0 z-0" />

      <Navbar />

      <div className="container mx-auto px-6 pt-36 pb-20 relative z-10 page-transition">
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold mb-12 cyber-font gradient-text text-center"
        >
          About Me
        </h1>

        <div
          ref={bioRef}
          className="max-w-3xl mx-auto mb-16 text-lg exospace-font leading-relaxed text-gray-300"
        >
          <p className="mb-6">
            I am an experienced Android developer with 5+ years of building robust,
            user-friendly mobile applications. My expertise also extends to desktop
            application development using JavaFX, creating seamless and intuitive
            user interfaces for various platforms.
          </p>

          <p className="mb-6">
            My development approach centers on creating clean, maintainable code
            and implementing modern architecture patterns like MVVM. I have a strong
            focus on performance optimization and delivering excellent user experiences
            across different device types and screen sizes.
          </p>

          <p>
            Beyond development, I enjoy sharing knowledge through tutorials and mentoring
            junior developers. I'm passionate about staying at the forefront of mobile
            technology trends and continuously expanding my skill set.
          </p>
        </div>

        <div ref={skillsRef} className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center gradient-text cyber-font">
            Skills & Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="skill-category bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-center exospace-font">
                  {skillGroup.category}
                </h3>

                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li
                      key={`${skillGroup.category}-${skill}`}
                      className="skill-item flex items-center text-gray-300"
                    >
                      <span className="h-1.5 w-1.5 bg-white/70 rounded-full mr-2" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
