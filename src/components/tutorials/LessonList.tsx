import React from "react";
import Link from "next/link";
import { Check, Lock, Play } from "lucide-react";

interface LessonProps {
  lessons: {
    id: number;
    slug: string;
    title: string;
    orderNumber: number;

  }[];
  courseSlug: string;
  currentLessonId?: number;
}

export default function LessonList({ lessons, courseSlug, currentLessonId }: LessonProps) {
  // Sort lessons by order number
  const sortedLessons = [...lessons].sort((a, b) => a.orderNumber - b.orderNumber);
  
  return (
    <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
      <div className="p-3 bg-white/5 border-b border-white/10">
        <h3 className="font-bold text-white">u0645u062du062au0648u0649 u0627u0644u062fu0648u0631u0629</h3>
      </div>
      <ul className="divide-y divide-white/5">
        {sortedLessons.map((lesson) => {
          const isActive = lesson.id === currentLessonId;
          
          return (
            <li key={lesson.id} className={`hover:bg-white/10 transition-colors ${isActive ? 'bg-[#00FF66]/10' : ''}`}>
              <Link 
                href={`/tutorials/${courseSlug}/lessons/${lesson.slug}`}
                className="flex items-center p-3"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isActive ? 'bg-[#00FF66] text-black' : 'bg-white/10'}`}>
                  {isActive ? <Check size={14} /> : <Play size={14} />}
                </div>
                <div className="flex-1">
                  <span className={`block ${isActive ? 'text-[#00FF66]' : 'text-white'}`}>
                    {lesson.title}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
