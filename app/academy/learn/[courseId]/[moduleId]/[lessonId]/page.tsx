"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ProtectedRouteClient from "@/components/ProtectedRouteClient";
import { useAuth } from "@/lib/hooks/useAuth";
// fetch the courses from the db using a helper function
import {
  courses as allCoursesData,
  quizzes as allQuizzesData,
} from "@/lib/data/courses";
import {
  Course,
  CourseModule,
  CourseLesson,
  Quiz,
  UserQuizSubmission,
} from "@/lib/types";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/Button";
import QuizRenderer from "@/components/QuizRenderer";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
  AcademicCapIcon,
  AwardIcon,
} from "@/components/icons";
import SidebarNavigation from "@/components/SidebarNavigation";
import { getCourses } from "@/lib/actions/getCourses";

function flattenLessons(course: Course) {
  const flat: {
    module: CourseModule;
    lesson: CourseLesson;
    moduleIndex: number;
    lessonIndex: number;
  }[] = [];
  course.modules.forEach((mod, modIdx) => {
    mod.lessons.forEach((les, lesIdx) => {
      flat.push({
        module: mod,
        lesson: les,
        moduleIndex: modIdx,
        lessonIndex: lesIdx,
      });
    });
  });
  return flat;
}

function EnrolledCourseViewerPageContent() {
  const { courseId, moduleId, lessonId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  // const courses = await getCourses();

  const {
    user,
    isEnrolled,
    completeLesson,
    isLessonCompleted,
    getCourseProgress,
    generateCertificate,
    getCertificate,
  } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [certificateEarned, setCertificateEarned] =
    useState<ReturnType<typeof getCertificate>>(null);

  // Get user course details
  useEffect(() => {
    async function fetchCourse() {
      const courses = await getCourses();
      const foundCourse = courses.find((c) => c.id === courseId);
      console.log("Found course:", foundCourse);
      setCourse(foundCourse || null);
    }
    fetchCourse();
  }, [courseId, router]);

  useEffect(() => {
    console.log("Params:", { courseId, moduleId, lessonId });
    // wait untill the course is fetched
    if (!course) return;

    console.log("Course fetched:", course);

    // if (!course)
    //   return router.replace("/academy/my-courses?error=course_not_found");

    const module = course.modules.find((m) => m.id === moduleId);
    if (!module)
      return router.replace("/academy/my-courses?error=module_not_found");

    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (!lesson)
      return router.replace("/academy/my-courses?error=lesson_not_found");

    const quiz =
      lesson.type === "quiz" && lesson.quizId
        ? allQuizzesData.find((q) => q.id === lesson.quizId) || null
        : null;

    setCourse(course);
    setCurrentModule(module);
    setCurrentLesson(lesson);
    setCurrentQuiz(quiz);
  }, [course, courseId, moduleId, lessonId, router]);

  useEffect(() => {
    if (course && user) {
      setCertificateEarned(getCertificate(course?.id));
    }
  }, [course, user]);

  const courseNavigation = useMemo(() => {
    if (!course || !lessonId) return { prev: null, next: null };
    const flat = flattenLessons(course);
    const index = flat.findIndex((l) => l.lesson.id === lessonId);
    return {
      prev: index > 0 ? flat[index - 1] : null,
      next: index < flat.length - 1 ? flat[index + 1] : null,
    };
  }, [course, lessonId]);

  const onCompleteAndContinue = async () => {
    if (
      course &&
      currentLesson &&
      !isLessonCompleted(course.id, currentLesson.id)
    ) {
      await completeLesson(course.id, currentLesson.id);
    }
    if (courseNavigation.next) {
      router.push(
        `/academy/learn/${course?.id}/${courseNavigation.next.module.id}/${courseNavigation.next.lesson.id}`
      );
    } else if (
      course &&
      getCourseProgress(course.id) === 100 &&
      !certificateEarned
    ) {
      const newCert = await generateCertificate(course.id);
      if (newCert) setCertificateEarned(newCert);
    }
  };

  const onQuizComplete = async (submission: UserQuizSubmission) => {
    if (
      submission.score >= 70 &&
      course &&
      currentLesson &&
      !isLessonCompleted(course.id, currentLesson.id)
    ) {
      await completeLesson(course.id, currentLesson.id);
    }
    if (
      !courseNavigation.next &&
      getCourseProgress(course?.id ?? "") === 100 &&
      !certificateEarned
    ) {
      const cert = await generateCertificate(course?.id ?? "");
      if (cert) setCertificateEarned(cert);
    }
  };

  if (!user || !course || !currentModule || !currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isEnrolled(course.id)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <XCircleIcon className="w-16 h-16 text-danger mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="mb-6">You are not enrolled in this course.</p>
        <Button variant="primary" asChild>
          <Link href={`/academy/${courseId}`}>Go to Course Page</Link>
        </Button>
      </div>
    );
  }

  const isQuiz = currentLesson.type === "quiz" && currentQuiz;
  const isCompleted = isLessonCompleted(course.id, currentLesson.id);
  const progress = getCourseProgress(course.id);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <SidebarNavigation
        course={course}
        currentLessonId={currentLesson.id}
        isLessonCompleted={isLessonCompleted}
        progress={progress}
      />
      <main className="flex-grow p-6 md:p-10 overflow-y-auto bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">{currentLesson.title}</h1>
          <p className="text-sm text-neutral-500 mb-6">
            Module: {currentModule.title}
          </p>

          {currentLesson.type === "video" && currentLesson.videoId && (
            <div className="aspect-video mb-6 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${currentLesson.videoId}`}
                sandbox="allow-scripts allow-same-origin"
                title={currentLesson.title}
                frameBorder="0"
                allow="allow-scripts allow-same-origin accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {currentLesson.type === "text" && (
            <div
              className="prose bg-white p-6 rounded shadow mb-6"
              dangerouslySetInnerHTML={{
                __html: currentLesson.content.replace(/\n/g, "<br />"),
              }}
            />
          )}

          {isQuiz && (
            <QuizRenderer quiz={currentQuiz!} onQuizComplete={onQuizComplete} />
          )}

          {progress === 100 && certificateEarned && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center shadow-md">
              <AwardIcon className="w-12 h-12 text-success mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Congratulations! You&apos;ve earned a certificate!
              </h3>
              <p className="text-green-600 mb-3">
                You have successfully completed {course.title}.
              </p>
              <p className="text-sm text-neutral-600 mb-1">
                Verification Code:{" "}
                <code className="bg-neutral-100 p-1 rounded">
                  {certificateEarned.verificationCode}
                </code>
              </p>
              <Button variant="primary" asChild className="mt-3">
                <Link href="/profile">View Certificate in Profile</Link>
              </Button>
            </div>
          )}

          <div className="mt-10 flex justify-between items-center">
            {courseNavigation.prev ? (
              <Button variant="outline" asChild>
                <Link
                  href={`/academy/learn/${course.id}/${courseNavigation.prev.module.id}/${courseNavigation.prev.lesson.id}`}
                  prefetch={true}
                >
                  <div className={`flex flex-dir-row items-center`}>
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                    Prev
                  </div>
                </Link>
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              variant="primary"
              onClick={onCompleteAndContinue}
              disabled={currentLesson.type === "quiz" && !isCompleted}
            >
              {isCompleted ? "Completed" : "Mark as Complete"}
              {courseNavigation.next ? (
                <ChevronRightIcon className="w-5 h-5 ml-2" />
              ) : progress === 100 ? (
                <AcademicCapIcon className="w-5 h-5 ml-2" />
              ) : (
                <CheckCircleIcon className="w-5 h-5 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function EnrolledCourseViewerPage() {
  return (
    <ProtectedRouteClient>
      <EnrolledCourseViewerPageContent />
    </ProtectedRouteClient>
  );
}
