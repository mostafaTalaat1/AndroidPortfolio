"use client";

import React, { useEffect, useRef, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, useTexture, Environment, OrbitControls, Html } from "@react-three/drei";
import { Vector3, Euler } from "three";

// Project data
const projects = [
  {
    id: "natour",
    title: "NATOUR",
    category: "Travel",
    description: "A Platform That Helps You Discover The Most Intriguing Locations For Your Vacations. Book Luxe Epic Spots In A Deeper Tale.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    image: "https://source.unsplash.com/random/800x600/?travel", // Temporary image from Unsplash
    color: "#00FF66", // Green color from the screenshot
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "ncehr",
    title: "NCEHR",
    category: "Health",
    description: "An NGO That Focuses On Solving The Problem Of Climate Change In Africa. They're Inter-Disciplinary With Various Academic Institutions Involved.",
    technologies: ["React", "GraphQL", "Tailwind CSS", "Strapi"],
    image: "https://source.unsplash.com/random/800x600/?health", // Temporary image from Unsplash
    color: "#00FF66", // Green color from the screenshot
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "eco-connect",
    title: "ECO CONNECT",
    category: "Environment",
    description: "A platform connecting environmental enthusiasts with green initiatives and sustainable projects around the globe.",
    technologies: ["Vue.js", "Firebase", "Mapbox", "PWA"],
    image: "/images/project-placeholder.jpg",
    color: "#00FF66",
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "health-track",
    title: "HEALTH TRACK",
    category: "Healthcare",
    description: "A comprehensive health monitoring system that integrates with wearable devices to provide insights and recommendations.",
    technologies: ["React Native", "Redux", "AWS", "Machine Learning"],
    image: "/images/project-placeholder.jpg",
    color: "#00FF66",
    links: {
      demo: "#",
      github: "#",
    },
  },
];

// 3D Project Card component
function ProjectCard({ project, position, rotation }: { 
  project: typeof projects[0], 
  position: [number, number, number], 
  rotation: [number, number, number] 
}) {
  const texture = useTexture(project.image);
  const cardRef = useRef<any>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      // Add floating animation
      gsap.to(cardRef.current.position, {
        y: position[1] + 0.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [position]);

  return (
    <group position={new Vector3(...position)} rotation={new Euler(...rotation)} ref={cardRef}>
      {/* Card base */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[5, 3, 0.1]} />
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.5}
          roughness={0.2}
          emissive="#101010"
        />
      </mesh>
      
      {/* Project title */}
      <mesh position={[0, 0.8, 0.06]}>
        <planeGeometry args={[3, 0.6]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.9} />
        <Html position={[0, 0, 0.1]} transform center style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2em' }}>
          <div className="text-center">{project.title}</div>
        </Html>
      </mesh>

      {/* Project description */}
      <Html position={[0, 0, 0.1]} transform scale={0.3} style={{ width: '400px' }}>
        <div className="bg-transparent text-white p-4 text-center">
          <p className="mt-2 text-sm">{project.description}</p>
          <div className="flex justify-center gap-2 mt-3">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="bg-white/10 text-xs px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <a href={project.links.demo} 
              className="text-xs text-green-400 hover:text-green-300 mr-4">View Project →</a>
          </div>
        </div>
      </Html>
    </group>
  );
}

// 3D Scene component
function ProjectsScene() {
  return (
    <Canvas shadows dpr={[1, 2]} className="canvas">
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 30]} />
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        autoRotate
        autoRotateSpeed={0.2}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      <Suspense fallback={null}>
        <Environment preset="city" />
        
        {/* Position the projects in 3D space */}
        <ProjectCard project={projects[0]} position={[-4, 0, 0]} rotation={[0, 0.2, 0]} />
        <ProjectCard project={projects[1]} position={[4, 0, 0]} rotation={[0, -0.2, 0]} />
        <ProjectCard project={projects[2]} position={[-2, -4, -2]} rotation={[0.2, 0.1, 0]} />
        <ProjectCard project={projects[3]} position={[2, -4, -2]} rotation={[0.2, -0.1, 0]} />
      </Suspense>
    </Canvas>
  );
}

export default function Projects3DPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.7 },
    });
    tl.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1 }
    );
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <style jsx global>{`
        .canvas {
          touch-action: none;
          height: 80vh !important;
        }
        .html-content {
          pointer-events: none;
          white-space: nowrap;
        }
      `}</style>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0" />

      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-10 relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-8 cyber-font text-center"
        >
          <span className="text-[#00FF66]">Explore</span> My Projects
        </h1>
        
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Dive into my 3D showcase of innovative projects across various domains. 
          Each project represents a unique challenge and solution I've crafted.
        </p>

        <div className="w-full h-[80vh] mb-12 relative">
          <ProjectsScene />
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">Interested in working together?</p>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-[#00FF66]/20 text-[#00FF66] hover:bg-[#00FF66]/30 transition-all duration-300 inline-block"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </main>
  );
}
