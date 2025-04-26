"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Tutorial data
const tutorials = [
  {
    id: "android-mvvm",
    title: "Building Android Apps with MVVM",
    category: "Android",
    description: "Learn how to structure your Android applications using the MVVM architecture pattern for cleaner, more maintainable code.",
    date: "March 15, 2025",
    readTime: "12 min read",
    image: "/images/project-placeholder.jpg",
  },
  {
    id: "android-room-db",
    title: "Android Room Database Complete Guide",
    category: "Android",
    description: "Master the Room persistence library for Android to efficiently store and manage data in your applications.",
    date: "February 28, 2025",
    readTime: "15 min read",
    image: "/images/project-placeholder.jpg",
  },
  {
    id: "android-animations",
    title: "Creating Engaging UI Animations in Android",
    category: "Android",
    description: "Discover how to implement smooth, performant animations in your Android apps to enhance the user experience.",
    date: "January 10, 2025",
    readTime: "10 min read",
    image: "/images/project-placeholder.jpg",
  },
  {
    id: "javafx-intro",
    title: "Getting Started with JavaFX",
    category: "JavaFX",
    description: "A comprehensive guide to building your first desktop application with JavaFX and Scene Builder.",
    date: "March 5, 2025",
    readTime: "20 min read",
    image: "/images/project-placeholder.jpg",
  },
  {
    id: "javafx-fxml",
    title: "Mastering FXML for JavaFX Applications",
    category: "JavaFX",
    description: "Learn how to use FXML to separate UI design from business logic in your JavaFX applications.",
    date: "February 18, 2025",
    readTime: "15 min read",
    image: "/images/project-placeholder.jpg",
  },
  {
    id: "javafx-custom-controls",
    title: "Creating Custom Controls in JavaFX",
    category: "JavaFX",
    description: "Extend the JavaFX library by creating your own reusable custom controls for unique user interfaces.",
    date: "January 25, 2025",
    readTime: "18 min read",
    image: "/images/project-placeholder.jpg",
  },
];

export default function TutorialsPage() {
  const [filter, setFilter] = useState<string>("all");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const tutorialsRef = useRef<HTMLDivElement>(null);

  const filteredTutorials = filter === "all"
    ? tutorials
    : tutorials.filter(tutorial => tutorial.category.toLowerCase() === filter.toLowerCase());

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.7 },
    });

    tl.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 }
    );

    tl.fromTo(
      filterRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.4"
    );

    // Animate tutorials with stagger effect
    gsap.fromTo(
      ".tutorial-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tutorialsRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  // Re-animate tutorial cards when filter changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: filter triggers re-animation
  useEffect(() => {
    gsap.fromTo(
      ".tutorial-card",
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#040414] text-white">
      <div className="grid-pattern absolute inset-0 opacity-20" />
      <div className="dots-animation absolute inset-0 z-0" />

      <Navbar />

      <div className="container mx-auto px-6 pt-36 pb-20 relative z-10 page-transition">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-12 cyber-font gradient-text text-center"
        >
          Tutorials
        </h1>

        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-300 exospace-font">
            Learn development tips, tricks, and best practices with my tutorials.
            Browse by category or explore all content below.
          </p>
        </div>

        <div ref={filterRef} className="flex justify-center mb-16 space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full transition-all duration-300 hover-text ${
              filter === "all"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("android")}
            className={`px-6 py-2 rounded-full transition-all duration-300 hover-text ${
              filter === "android"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Android
          </button>
          <button
            onClick={() => setFilter("javafx")}
            className={`px-6 py-2 rounded-full transition-all duration-300 hover-text ${
              filter === "javafx"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            JavaFX
          </button>
        </div>

        <div
          ref={tutorialsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTutorials.map((tutorial) => (
            <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`}>
              <Card
                className="tutorial-card h-full bg-white/5 border-white/10 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300"
              >
                <div className="aspect-video relative">
                  <Image
                    src={tutorial.image}
                    alt={tutorial.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <Badge
                    className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  >
                    {tutorial.category}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl exospace-font line-clamp-2">
                    {tutorial.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <CardDescription className="text-gray-300 line-clamp-3">
                    {tutorial.description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex justify-between text-sm text-gray-400">
                  <span>{tutorial.date}</span>
                  <span>{tutorial.readTime}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="hover-text btn border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-md transition-all duration-300 backdrop-blur-sm inline-block"
          >
            Request a Tutorial Topic
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
    </main>
  );
}
