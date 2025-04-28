/**
 * واجهة برمجة التطبيقات للتفاعل مع WordPress
 */

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://api.yourdomain.com/wp-json";

// u0627u0644u062du062d u0627u0644u0623u0642u0635u0649 u0644u0639u062fu062f u0627u0644u0639u0646u0627u0635u0631 u0644u0643u0644 u0635u0641u062du0629
const PER_PAGE = 50;

// u0627u0633u062au0631u062cu0627u0639 u0644u063au0627u062a u0627u0644u0628u0631u0645u062cu0629 u0627u0644u0645u062au0627u062du0629
export async function fetchProgrammingLanguages() {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/programming_language?per_page=${PER_PAGE}`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((language) => ({
      id: language.id,
      name: language.name,
      slug: language.slug,
      count: language.count,
    }));
  } catch (error) {
    console.error("Error fetching programming languages:", error);
    return [];
  }
}

// u0627u0633u062au0631u062cu0627u0639 u0627u0644u062fu0648u0631u0627u062a
export async function fetchCourses(language = null) {
  try {
    let url = `${API_URL}/wp/v2/course?_embed&per_page=${PER_PAGE}`;
    
    if (language) {
      url += `&programming_language=${language}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((course) => ({
      id: course.id,
      title: course.title.rendered,
      slug: course.slug,
      excerpt: course.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
      featuredImage: course._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/default-course.jpg",
      languages: course._embedded?.["wp:term"]?.[0]
        ?.filter((term) => term.taxonomy === "programming_language")
        .map((term) => ({
          id: term.id,
          name: term.name,
          slug: term.slug,
        })) || [],
      level: course.acf?.level || "مبتدئ",
      duration: course.acf?.duration || "غير محدد",
      lessonCount: course.acf?.lesson_count || 0,
    }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// u0627u0633u062au0631u062cu0627u0639 u062fu0648u0631u0629 u0645u0639 u0627u0644u062fu0648u0631u0627u062a
export async function fetchCourseWithLessons(courseId) {
  try {
    const response = await fetch(
      `${API_URL}/learning/v1/course/${courseId}`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching course details: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching course with lessons:", error);
    return null;
  }
}

// u0627u0633u062au0631u062cu0627u0639 u062fu0648u0631u0629 u0628u0627u0644u0627u0633u0645 u0627u0644u0645u0633u062au0627u0631
export async function fetchCourseBySlug(slug) {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/course?slug=${slug}&_embed`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching course: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.length) {
      return null;
    }
    
    const course = data[0];
    
    return {
      id: course.id,
      title: course.title.rendered,
      content: course.content.rendered,
      excerpt: course.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
      featuredImage: course._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/default-course.jpg",
      languages: course._embedded?.["wp:term"]?.[0]
        ?.filter((term) => term.taxonomy === "programming_language")
        .map((term) => ({
          id: term.id,
          name: term.name,
          slug: term.slug,
        })) || [],
      level: course.acf?.level || "مبتدئ",
      duration: course.acf?.duration || "غير محدد",
      requirements: course.acf?.requirements || [],
      videoIntro: course.acf?.video_intro || null,
    };
  } catch (error) {
    console.error("Error fetching course by slug:", error);
    return null;
  }
}

// u0627u0633u062au0631u062cu0627u0639 u062fu0648u0631u0629 u0645u0639u064au0646
export async function fetchLesson(lessonId) {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/lesson/${lessonId}?_embed`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching lesson: ${response.status}`);
    }
    
    const lesson = await response.json();
    
    return {
      id: lesson.id,
      title: lesson.title.rendered,
      content: lesson.content.rendered,
      attachments: lesson.acf?.attachments || [],
      orderNumber: lesson.acf?.order_number || 0,
      courseId: lesson.acf?.course_id || null,
    };
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
}

// u0627u0633u062au0631u062cu0627u0639 u062fu0648u0631u0627u062a u062fu0648u0631u0629 u0645u0639u064au0646u0629
export async function fetchLessons(courseId) {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/lesson?course=${courseId}&per_page=${PER_PAGE}&_embed`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching lessons: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((lesson) => ({
      id: lesson.id,
      title: lesson.title.rendered,
      slug: lesson.slug,
      excerpt: lesson.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
      orderNumber: lesson.acf?.order_number || 0,
    }));
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
}
