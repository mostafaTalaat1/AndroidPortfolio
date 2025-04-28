"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { fetchCourseBySlug, fetchLessons } from "@/lib/api/wordpress";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import LessonList from "@/components/tutorials/LessonList";
import Link from "next/link";

// نستخدم بيانات وهمية مؤقتة حتى يتم إعداد ال API
const mockCourse = {
  id: 1,
  slug: "java-basics",
  title: "أساسيات البرمجة بلغة Java",
  content: `
    <h2>محتوى الدورة</h2>
    <p>تعلم أساسيات لغة Java من الصفر حتى الاحتراف، بدءاً من المفاهيم الأساسية وصولاً إلى البرمجة كائنية التوجه.</p>
    
    <h3>ماذا ستتعلم؟</h3>
    <ul>
      <li>أساسيات Java وبيئة التطوير</li>
      <li>المتغيرات وأنواع البيانات</li>
      <li>جمل التحكم وحلقات التكرار</li>
      <li>المصفوفات والمجموعات</li>
      <li>البرمجة كائنية التوجه</li>
      <li>التعامل مع الأخطاء والاستثناءات</li>
      <li>العمل مع الملفات وقواعد البيانات</li>
      <li>تطوير تطبيقات عملية</li>
    </ul>
  `,
  excerpt: "تعلم أساسيات لغة Java من الصفر حتى الاحتراف، بدءاً من المفاهيم الأساسية وصولاً إلى البرمجة كائنية التوجه.",
  featuredImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  languages: [{ id: 1, name: "Java", slug: "java" }],
  level: "مبتدئ",
  duration: "8 أسابيع",
  requirements: [
    "معرفة أساسية باستخدام الحاسوب",
    "فهم بسيط لمفاهيم البرمجة (ليس ضرورياً)",
    "حماس للتعلم والتطبيق العملي"
  ],

};

const mockLessons = [
  {
    id: 101,
    slug: "introduction-to-java",
    title: "مقدمة في لغة Java وبيئة التطوير",
    orderNumber: 1,
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34"
  },
  {
    id: 102,
    slug: "variables-and-data-types",
    title: "المتغيرات وأنواع البيانات",
    orderNumber: 2,
    videoUrl: "https://www.youtube.com/embed/RRPPx2mZHZk"
  },
  {
    id: 103,
    slug: "control-flow",
    title: "جمل التحكم وهياكل الشرط",
    orderNumber: 3,
    videoUrl: "https://www.youtube.com/embed/ldYLYRNaucM"
  },
  {
    id: 104,
    slug: "loops",
    title: "حلقات التكرار",
    orderNumber: 4,
    videoUrl: "https://www.youtube.com/embed/6djggrlkHY8"
  },
  {
    id: 105,
    slug: "arrays",
    title: "المصفوفات",
    orderNumber: 5,
    videoUrl: "https://www.youtube.com/embed/xzjZy-dHHLw"
  },
];

export default function CoursePage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(mockCourse);
  const [lessons, setLessons] = useState(mockLessons);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCourseData() {
      // في المستقبل عندما يتم إعداد WordPress API
      /* 
      setLoading(true);
      try {
        const courseData = await fetchCourseBySlug(slug as string);
        if (courseData) {
          setCourse(courseData);
          
          const lessonsData = await fetchLessons(courseData.id);
          if (lessonsData && lessonsData.length > 0) {
            setLessons(lessonsData);
          }
        }
      } catch (error) {
        console.error("Error loading course data:", error);
        // Fall back to mock data
      } finally {
        setLoading(false);
      }
      */
      
      // For now, we're using mock data
      // This simulates filtering the mock course by slug
      if (slug !== mockCourse.slug) {
        // In the real implementation, we would redirect to 404 or show error
        console.log("Course not found:", slug);
      }
    }

    loadCourseData();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-6 pt-36 pb-20 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00FF66]"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0" />

      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-20 relative z-10" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* تفاصيل الدورة */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white/5 rounded-lg border border-white/10 p-6 mb-8">
              <h1 className="text-3xl font-bold mb-4 text-white">{course.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {course.languages?.map((language) => (
                  <Badge key={language.id} className="bg-[#00FF66]/20 text-[#00FF66] border-none">
                    {language.name}
                  </Badge>
                ))}
                
                <Badge variant="outline" className="text-white">
                  {course.level}
                </Badge>
                
                <Badge variant="outline" className="text-white">
                  {course.duration}
                </Badge>
                
                <Badge variant="outline" className="text-white">
                  {lessons.length} درس
                </Badge>
              </div>
              
              <div className="aspect-video relative mb-6 rounded-md overflow-hidden">
                <Image
                  src={course.featuredImage}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="prose prose-invert max-w-none mb-6"
                 dangerouslySetInnerHTML={{ __html: course.content }}
              />
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">المتطلبات السابقة</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {course.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Link 
                  href={`/tutorials/${course.slug}/lessons/${lessons[0]?.slug || ''}`}
                  className="px-8 py-3 rounded-full bg-[#00FF66] text-black hover:bg-[#00FF66]/90 transition-all duration-300 inline-block"
                >
                  ابدأ التعلم الآن
                </Link>
              </div>
            </div>
          </div>
          
          {/* قائمة الدروس */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <LessonList 
              lessons={lessons} 
              courseSlug={course.slug} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
