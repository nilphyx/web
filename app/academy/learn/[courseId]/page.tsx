"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Spinner from "@/components/Spinner";
import ProtectedRouteClient from "@/components/ProtectedRouteClient";
import { getCourses } from "@/lib/actions/getCourses";
import { Course } from "@/lib/types";

function LearnCourseRedirectorContent() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const { isEnrolled, isLoading: authLoading, user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);

  // Get user course details
  useEffect(() => {
    async function fetchCourse() {
      const courses = await getCourses();
      const foundCourse = courses.find((c) => c.id === courseId);
      console.log("Found course:", foundCourse);
      setCourse(foundCourse || null);
    }
    fetchCourse();
  }, [params.courseId, router]);

  useEffect(() => {
    // wait for auth to load, check if user exists and if course is found before doing anything
    if (authLoading || !user || !course) return;

    if (!courseId) {
      router.replace("/academy?error=no_course_id");
      return;
    }

    if (!isEnrolled(courseId)) {
      router.replace(`/academy/${courseId}?error=not_enrolled`); // Redirect to course detail page if not enrolled
      return;
    }

    if (
      course &&
      course.modules.length > 0 &&
      course.modules[0].lessons.length > 0
    ) {
      const firstModule = course.modules[0];
      const firstLesson = firstModule.lessons[0];
      const firstModuleId = firstModule.id;
      const firstLessonId = firstLesson.id;

      // const firstQuizId = firstLesson.quizzes?.[0]?.id;

      let url = `/academy/learn/${course.id}/${firstModuleId}/${firstLessonId}`;

      // if (firstQuizId) {
      //   url += `/${firstQuizId}`;
      // }

      router.replace(url);
    } else {
      // Course has no lessons or modules, or course not found (though isEnrolled should prevent this for valid courses)
      router.replace(`/academy/${courseId}?error=no_lessons`);
    }
  }, [authLoading, user, course, isEnrolled, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
      {/* <p className="ml-4 text-neutral-600">
        Preparing your learning experience...
      </p> */}
    </div>
  );
}

export default function LearnCourseRedirectorPage() {
  return (
    <ProtectedRouteClient>
      <LearnCourseRedirectorContent />
    </ProtectedRouteClient>
  );
}
