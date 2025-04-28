"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { fetchCourseBySlug, fetchLessons } from "@/lib/api/wordpress";
import LessonList from "@/components/tutorials/LessonList";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Mock data until WordPress API is set up
const mockCourse = {
  id: 1,
  slug: "java-basics",
  title: "أساسيات البرمجة بلغة Java",
};

const mockLessons = [
  {
    id: 101,
    slug: "introduction-to-java",
    title: "مقدمة في لغة Java وبيئة التطوير",
    orderNumber: 1,

    content: `
      <h2>مقدمة في لغة Java وبيئة التطوير</h2>
      <p>في هذا الدرس، ستتعرف على لغة Java وتاريخها وأهميتها في عالم البرمجة. سنستعرض الأساسيات وكيفية إعداد بيئة التطوير على جهازك.</p>
      
      <h3>ما هي لغة Java؟</h3>
      <p>Java هي لغة برمجة عالية المستوى، كائنية التوجه، ومتعددة الأغراض تم تطويرها بواسطة شركة Sun Microsystems في عام 1995. تتميز Java بمبدأ "اكتب مرة واحدة، شغّل في أي مكان" (Write Once, Run Anywhere) بفضل الآلة الافتراضية Java Virtual Machine (JVM).</p>
      
      <h3>خصائص لغة Java</h3>
      <ul>
        <li><strong>كائنية التوجه:</strong> تعتمد على مفهوم الكائنات والفئات.</li>
        <li><strong>بسيطة:</strong> تم تصميمها لتكون سهلة التعلم والاستخدام.</li>
        <li><strong>مستقلة عن المنصة:</strong> تعمل على أي نظام تشغيل يدعم JVM.</li>
        <li><strong>آمنة:</strong> تتضمن ميزات أمان متقدمة.</li>
        <li><strong>قوية:</strong> تتحمل الأخطاء بشكل أفضل من العديد من اللغات الأخرى.</li>
      </ul>
      
      <h3>إعداد بيئة التطوير</h3>
      <p>لبدء البرمجة بلغة Java، تحتاج إلى تثبيت:</p>
      <ol>
        <li>Java Development Kit (JDK)</li>
        <li>بيئة تطوير متكاملة (IDE) مثل IntelliJ IDEA أو Eclipse</li>
      </ol>
      
      <h4>خطوات تثبيت JDK:</h4>
      <ol>
        <li>قم بزيارة الموقع الرسمي لـ Oracle وقم بتنزيل أحدث إصدار من JDK.</li>
        <li>قم بتثبيت JDK على جهازك باتباع الخطوات المطلوبة.</li>
        <li>قم بإعداد متغيرات البيئة JAVA_HOME وPATH.</li>
      </ol>
      
      <h3>كتابة أول برنامج Java</h3>
      <p>لنبدأ بكتابة برنامج Hello World التقليدي:</p>
      
      <pre><code class="language-java">
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("مرحباً بالعالم!");
    }
}
</code></pre>
      
      <p>قم بحفظ هذا الكود في ملف يسمى <code>HelloWorld.java</code>، ثم قم بتشغيله من خلال الـ IDE أو من سطر الأوامر.</p>
    `
  },
  {
    id: 102,
    slug: "variables-and-data-types",
    title: "المتغيرات وأنواع البيانات",
    orderNumber: 2,

    content: `
      <h2>المتغيرات وأنواع البيانات في Java</h2>
      <p>في هذا الدرس، سنتعلم عن المتغيرات وأنواع البيانات المختلفة في لغة Java وكيفية استخدامها.</p>
      
      <h3>ما هي المتغيرات؟</h3>
      <p>المتغير هو اسم يُستخدم لتخزين قيمة في الذاكرة يمكن استخدامها أو تعديلها في البرنامج.</p>
      
      <h3>إعلان المتغيرات</h3>
      <p>في Java، يجب أن تُعلن عن المتغير قبل استخدامه، وذلك بتحديد نوع البيانات واسم المتغير:</p>
      
      <pre><code class="language-java">نوع_البيانات اسم_المتغير = القيمة;</code></pre>
      
      <h3>أنواع البيانات الأساسية</h3>
      <ul>
        <li><strong>byte:</strong> يستخدم لتخزين الأعداد الصحيحة من -128 إلى 127</li>
        <li><strong>short:</strong> يستخدم لتخزين الأعداد الصحيحة من -32,768 إلى 32,767</li>
        <li><strong>int:</strong> يستخدم لتخزين الأعداد الصحيحة من -2^31 إلى 2^31-1</li>
        <li><strong>long:</strong> يستخدم لتخزين الأعداد الصحيحة الكبيرة</li>
        <li><strong>float:</strong> يستخدم لتخزين الأعداد العشرية (دقة 6-7 أرقام عشرية)</li>
        <li><strong>double:</strong> يستخدم لتخزين الأعداد العشرية (دقة 15 رقم عشري)</li>
        <li><strong>char:</strong> يستخدم لتخزين حرف واحد</li>
        <li><strong>boolean:</strong> يستخدم لتخزين قيم منطقية (true أو false)</li>
      </ul>
      
      <h3>أمثلة على إعلان المتغيرات</h3>
      <pre><code class="language-java">
int age = 25;  // متغير لتخزين العمر
double salary = 5000.50;  // متغير لتخزين الراتب
char grade = 'A';  // متغير لتخزين الدرجة
boolean isStudent = true;  // متغير منطقي لتحديد ما إذا كان الشخص طالبًا أم لا
</code></pre>
      
      <h3>أنواع البيانات المرجعية</h3>
      <p>بالإضافة إلى أنواع البيانات الأساسية، توفر Java أنواع بيانات مرجعية مثل:</p>
      <ul>
        <li><strong>String:</strong> لتخزين سلاسل من النصوص</li>
        <li><strong>Arrays:</strong> لتخزين مجموعة من العناصر من نفس النوع</li>
        <li><strong>Classes:</strong> لتعريف كائنات مخصصة</li>
      </ul>
      
      <h3>مثال على استخدام String</h3>
      <pre><code class="language-java">
String name = "محمد";  // إعلان وتهيئة متغير نصي
System.out.println("مرحباً " + name);  // دمج النصوص باستخدام عامل +
</code></pre>
      
      <h3>تحويل أنواع البيانات</h3>
      <p>يمكن تحويل نوع بيانات إلى نوع آخر في Java بطريقتين:</p>
      
      <h4>1. التحويل الضمني (Implicit Casting)</h4>
      <p>يحدث تلقائياً عند تحويل نوع بيانات أصغر إلى نوع أكبر:</p>
      <pre><code class="language-java">
int myInt = 100;
long myLong = myInt; // تحويل ضمني من int إلى long
</code></pre>
      
      <h4>2. التحويل الصريح (Explicit Casting)</h4>
      <p>مطلوب عند تحويل نوع بيانات أكبر إلى نوع أصغر:</p>
      <pre><code class="language-java">
double myDouble = 9.78;
int myInt = (int) myDouble; // تحويل صريح من double إلى int، ستكون القيمة 9
</code></pre>
    `
  },
  {
    id: 103,
    slug: "control-flow",
    title: "جمل التحكم وهياكل الشرط",
    orderNumber: 3,

  },
  {
    id: 104,
    slug: "loops",
    title: "حلقات التكرار",
    orderNumber: 4,

  },
  {
    id: 105,
    slug: "arrays",
    title: "المصفوفات",
    orderNumber: 5,

  },
];

export default function LessonPage() {
  const { slug, lessonSlug } = useParams();
  const [course, setCourse] = useState(mockCourse);
  const [lessons, setLessons] = useState(mockLessons);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // في المستقبل عندما يتم إعداد WordPress API
        /*
        const courseData = await fetchCourseBySlug(slug as string);
        if (courseData) {
          setCourse(courseData);
          
          const lessonsData = await fetchLessons(courseData.id);
          if (lessonsData && lessonsData.length > 0) {
            setLessons(lessonsData);
            
            const lesson = lessonsData.find(l => l.slug === lessonSlug);
            if (lesson) {
              setCurrentLesson(lesson);
            }
          }
        }
        */
        
        // For now, we use mock data
        const lesson = mockLessons.find(l => l.slug === lessonSlug);
        if (lesson) {
          setCurrentLesson(lesson);
        }
      } catch (error) {
        console.error("Error loading lesson data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [slug, lessonSlug]);

  // Get previous and next lessons
  const currentIndex = lessons.findIndex(l => l.slug === lessonSlug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  if (loading || !currentLesson) {
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* قائمة الدروس - مخفية على الشاشات الصغيرة، تظهر على الشاشات الكبيرة */}
          <div className="hidden lg:block lg:col-span-1">
            <LessonList 
              lessons={lessons} 
              courseSlug={course.slug as string}
              currentLessonId={currentLesson.id}
            />
          </div>
          
          {/* محتوى الدرس */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 rounded-lg border border-white/10 p-6">
              <div className="mb-6">
                <Link href={`/tutorials/${slug}`} className="text-[#00FF66] hover:text-[#00FF66]/80 mb-2 inline-block">
                  &larr; العودة إلى الدورة
                </Link>
                <h1 className="text-2xl font-bold text-white">{currentLesson.title}</h1>
              </div>
              

              
              <div className="prose prose-invert max-w-none">
                {currentLesson.content ? (
                  <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                ) : (
                  <p>محتوى هذا الدرس غير متوفر حالياً.</p>
                )}
              </div>
              
              {/* التنقل بين الدروس */}
              <div className="flex justify-between mt-8 border-t border-white/10 pt-6">
                {prevLesson ? (
                  <Link
                    href={`/tutorials/${slug}/lessons/${prevLesson.slug}`}
                    className="flex items-center text-[#00FF66] hover:text-[#00FF66]/80"
                  >
                    <ChevronRight className="ml-1" size={18} />
                    الدرس السابق
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {nextLesson && (
                  <Link
                    href={`/tutorials/${slug}/lessons/${nextLesson.slug}`}
                    className="flex items-center text-[#00FF66] hover:text-[#00FF66]/80"
                  >
                    الدرس التالي
                    <ChevronLeft className="mr-1" size={18} />
                  </Link>
                )}
              </div>
            </div>
            
            {/* عرض قائمة الدروس على الشاشات الصغيرة */}
            <div className="mt-8 block lg:hidden">
              <h3 className="text-xl font-bold mb-4">دروس الدورة</h3>
              <LessonList 
                lessons={lessons} 
                courseSlug={course.slug as string}
                currentLessonId={currentLesson.id}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
