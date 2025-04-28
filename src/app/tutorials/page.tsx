"use client";

import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { fetchCourses, fetchProgrammingLanguages } from "@/lib/api/wordpress";
import CourseCard from "@/components/tutorials/CourseCard";
import LanguageFilter from "@/components/tutorials/LanguageFilter";

// Mock data to use until the WordPress backend is setup
const mockLanguages = [
  { id: 1, name: "Java", slug: "java", count: 3 },
  { id: 2, name: "Kotlin", slug: "kotlin", count: 2 },
  { id: 3, name: "Python", slug: "python", count: 4 },
  { id: 4, name: "JavaScript", slug: "javascript", count: 2 },
];

const mockCourses = [
  {
    id: 1,
    slug: "java-basics",
    title: "أساسيات البرمجة بلغة Java",
    excerpt: "تعلم أساسيات لغة Java من الصفر حتى الاحتراف، بدءاً من المفاهيم الأساسية وصولاً إلى البرمجة كائنية التوجه.",
    featuredImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    languages: [{ id: 1, name: "Java", slug: "java" }],
    level: "مبتدئ",
    duration: "8 أسابيع",
    lessonCount: 24,
  },
  {
    id: 2,
    slug: "kotlin-for-android",
    title: "Kotlin لتطوير تطبيقات Android",
    excerpt: "دورة شاملة في لغة Kotlin مع التركيز على تطوير تطبيقات Android الحديثة باستخدام أحدث التقنيات.",
    featuredImage: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070&auto=format&fit=crop",
    languages: [{ id: 2, name: "Kotlin", slug: "kotlin" }],
    level: "متوسط",
    duration: "10 أسابيع",
    lessonCount: 32,
  },
  {
    id: 3,
    slug: "python-data-science",
    title: "علوم البيانات باستخدام Python",
    excerpt: "تعلم كيفية تحليل البيانات واستخراج الرؤى منها باستخدام مكتبات Python الشهيرة مثل Pandas و NumPy و Matplotlib.",
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    languages: [{ id: 3, name: "Python", slug: "python" }],
    level: "متقدم",
    duration: "12 أسبوع",
    lessonCount: 40,
  },
  {
    id: 4,
    slug: "advanced-java",
    title: "Java المتقدمة: تطبيقات الإنتربرايز",
    excerpt: "تعلم تطوير تطبيقات الإنتربرايز باستخدام Java EE وتقنيات مثل Spring و Hibernate وأنماط التصميم المتقدمة.",
    featuredImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop",
    languages: [{ id: 1, name: "Java", slug: "java" }],
    level: "متقدم",
    duration: "14 أسبوع",
    lessonCount: 36,
  },
  {
    id: 5,
    slug: "js-web-development",
    title: "تطوير الويب الحديث باستخدام JavaScript",
    excerpt: "تعلم تطوير تطبيقات الويب الحديثة باستخدام JavaScript وإطارات العمل الشهيرة مثل React و Vue و Node.js.",
    featuredImage: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2071&auto=format&fit=crop",
    languages: [{ id: 4, name: "JavaScript", slug: "javascript" }],
    level: "متوسط",
    duration: "10 أسابيع",
    lessonCount: 30,
  },
];

export default function TutorialsPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [languages, setLanguages] = useState(mockLanguages);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [loading, setLoading] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Load data from WordPress API when it's ready
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // جلب لغات البرمجة
        const languagesData = await fetchProgrammingLanguages();
        if (languagesData.length > 0) {
          setLanguages(languagesData);
        } else {
          // استخدام البيانات التجريبية كنسخة احتياطية
          setLanguages(mockLanguages);
        }

        // جلب الدورات
        const coursesData = await fetchCourses();
        if (coursesData.length > 0) {
          setCourses(coursesData);
        } else {
          // استخدام البيانات التجريبية كنسخة احتياطية
          setCourses(mockCourses);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // استخدام البيانات التجريبية في حالة الفشل
        setLanguages(mockLanguages);
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  
  // Filter courses client-side until API is set up
  const filteredCourses = selectedLanguage === "all"
    ? courses
    : courses.filter(course => 
        course.languages.some(lang => lang.slug === selectedLanguage)
      );

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0" />

      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-20 relative z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-6 cyber-font text-center"
          dir="rtl"
        >
          <span className="text-[#00FF66]">تعلم</span> البرمجة
        </h1>
        
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto" dir="rtl">
          استكشف مجموعة من الدورات التعليمية المتميزة في مختلف لغات البرمجة، من المستوى المبتدئ إلى المتقدم.
        </p>

        <LanguageFilter 
          languages={languages} 
          selectedLanguage={selectedLanguage} 
          onSelectLanguage={setSelectedLanguage} 
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FF66]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center" dir="rtl">
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full bg-[#00FF66]/20 text-[#00FF66] hover:bg-[#00FF66]/30 transition-all duration-300 inline-block"
          >
            هل تريد دورة في موضوع معين؟ تواصل معنا
          </Link>
        </div>
      </div>
    </main>
  );
}
