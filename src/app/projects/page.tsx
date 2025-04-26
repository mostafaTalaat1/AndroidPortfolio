"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Project data
const projects = [
  {
    id: "android-fitness-tracker",
    title: "Fitness Tracker App",
    category: "Android",
    description: "A comprehensive fitness tracking application with workout plans, progress monitoring, and social features.",
    technologies: ["Kotlin", "MVVM", "Room", "Retrofit", "Material Design"],
    image: "/images/project-placeholder.jpg", // You can replace this with actual project images
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "android-recipe-app",
    title: "Recipe Finder",
    category: "Android",
    description: "An app that helps users discover recipes based on available ingredients, dietary restrictions, and preferences.",
    technologies: ["Java", "Firebase", "Material Components", "Glide"],
    image: "/images/project-placeholder.jpg",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "android-news-reader",
    title: "NewsFlash Reader",
    category: "Android",
    description: "A personalized news reader app that curates content based on user interests and reading habits.",
    technologies: ["Kotlin", "Jetpack Compose", "Coroutines", "Room", "Retrofit"],
    image: "/images/project-placeholder.jpg",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "javafx-inventory-system",
    title: "Inventory Management System",
    category: "JavaFX",
    description: "A desktop application for inventory management, order processing, and sales tracking for small businesses.",
    technologies: ["JavaFX", "FXML", "MySQL", "JasperReports"],
    image: "/images/project-placeholder.jpg",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "javafx-pos-system",
    title: "Point of Sale System",
    category: "JavaFX",
    description: "A comprehensive POS system with inventory management, sales tracking, and reporting features.",
    technologies: ["JavaFX", "Scene Builder", "SQL", "Jasper Reports"],
    image: "/images/project-placeholder.jpg",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "javafx-student-management",
    title: "Student Management System",
    category: "JavaFX",
    description: "A desktop application for educational institutions to manage student records, attendance, and performance.",
    technologies: ["JavaFX", "FXML", "MySQL", "iText PDF"],
    image: "/images/project-placeholder.jpg",
    links: {
      demo: "#",
      github: "#",
    },
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.category.toLowerCase() === filter.toLowerCase());

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

    // Animate projects with stagger effect
    gsap.fromTo(
      ".project-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  // Re-animate project cards when filter changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: filter triggers re-animation
  useEffect(() => {
    gsap.fromTo(
      ".project-card",
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
          My Projects
        </h1>

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
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="project-card bg-white/5 border-white/10 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl exospace-font">
                    {project.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-white/10 text-gray-300 hover:bg-white/20">
                    {project.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative rounded-md overflow-hidden bg-black/30">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <CardDescription className="text-gray-300">
                  {project.description}
                </CardDescription>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={`${project.id}-${tech}`}
                      variant="outline"
                      className="text-xs bg-white/5 border-white/10 text-gray-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Link
                  href={project.links.demo}
                  className="text-sm hover-text text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Live Demo
                </Link>
                <Link
                  href={project.links.github}
                  className="text-sm hover-text text-blue-400 hover:text-blue-300 transition-colors"
                >
                  GitHub
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
