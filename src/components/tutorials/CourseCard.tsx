import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CourseProps {
  course: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: string;
    languages?: { id: number; name: string; slug: string }[];
    level?: string;
    duration?: string;
    lessonCount?: number;
  };
}

export default function CourseCard({ course }: CourseProps) {
  return (
    <Link href={`/tutorials/${course.slug}`}>
      <div className="group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-full hover:bg-white/10 hover:border-white/20 hover:transform hover:translate-y-[-5px] transition-all duration-300">
        <div className="aspect-video relative">
          <Image 
            src={course.featuredImage} 
            alt={course.title}
            fill 
            className="object-cover" 
            onError={(e) => {
              // Fallback image if the featured image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "/images/default-course.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {course.languages && course.languages[0] && (
            <Badge className="absolute top-2 right-2 bg-[#00FF66]/20 text-[#00FF66] border-none">
              {course.languages[0].name}
            </Badge>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-[#00FF66] transition-colors line-clamp-2">
              {course.title}
            </h3>
            {course.level && (
              <Badge variant="outline" className="text-xs ml-2 whitespace-nowrap">
                {course.level}
              </Badge>
            )}
          </div>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-3" 
             dangerouslySetInnerHTML={{ __html: course.excerpt }} />
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{course.lessonCount || 0} u062fu0631u0633</span>
            <span>{course.duration || "u063au064au0631 u0645u062du062fu062f"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
