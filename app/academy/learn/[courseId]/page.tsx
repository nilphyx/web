'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { courses as allCoursesData } from '@/lib/data/courses';
import Spinner from '@/components/Spinner';
import ProtectedRouteClient from '@/components/ProtectedRouteClient';

function LearnCourseRedirectorContent() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const { isEnrolled, isLoading: authLoading } = useAuth(); // isLoading is now correctly destructured

  useEffect(() => {
    if (authLoading) return; // Wait for auth state to be determined

    if (!courseId) {
      router.replace('/academy?error=no_course_id');
      return;
    }

    if (!isEnrolled(courseId)) {
      router.replace(`/academy/${courseId}?error=not_enrolled`); // Redirect to course detail page if not enrolled
      return;
    }

    const course = allCoursesData.find(c => c.id === courseId);
    if (course && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      const firstModuleId = course.modules[0].id;
      const firstLessonId = course.modules[0].lessons[0].id;
      router.replace(`/academy/learn/${courseId}/${firstModuleId}/${firstLessonId}`);
    } else {
      // Course has no lessons or modules, or course not found (though isEnrolled should prevent this for valid courses)
      router.replace(`/academy/${courseId}?error=no_lessons`);
    }
  }, [courseId, router, isEnrolled, authLoading]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
      <p className="ml-4 text-neutral-600">Preparing your learning experience...</p>
    </div>
  );
}

export default function LearnCourseRedirectorPage() {
    return (
        <ProtectedRouteClient>
            <LearnCourseRedirectorContent />
        </ProtectedRouteClient>
    )
}