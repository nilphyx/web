"use client"; // Required for useAuth and potentially interactive elements

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { courses as allCoursesData } from "@/lib/data/courses";
import { Course, CourseModule, CourseLesson } from "@/lib/types";
import { Button } from "@/components/Button";
import {
  AcademicCapIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CpuChipIcon,
  DocumentTextIcon,
  FilmIcon,
  LightBulbIcon,
  ListBulletIcon,
  LockClosedIcon,
  PlayCircleIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
  AwardIcon, // Added AwardIcon import
} from "@/components/icons";
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { Card } from "@/components/Card"; // Added Card import

// This component can be a server component if we pass course data as props
// But to use useAuth for enroll/unenroll, parts of it or the whole page might need to be client
// For simplicity, making it client for now.

// export async function generateMetadata({ params }: { params: { courseId: string } }) {
//   const course = allCoursesData.find((c) => c.id === params.courseId);
//   if (!course) return { title: 'Course Not Found' };
//   return {
//     title: course.title,
//     description: course.description,
//   };
// }

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >({});

  const {
    user,
    // enrollCourse,
    enrollCourseBySlug,
    unenrollCourse,
    isEnrolled,
    getCourseProgress,
    isLoading: authLoading,
  } = useAuth(); // isLoading is now correctly destructured
  const router = useRouter();

  useEffect(() => {
    const foundCourse = allCoursesData.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      // Expand first module by default
      if (foundCourse.modules.length > 0) {
        setExpandedModules({ [foundCourse.modules[0].id]: true });
      }
    } else {
      // Handle course not found, e.g., redirect or show 404 content
      router.push("/academy?error=notfound");
    }
  }, [courseId, router]);

  if (!course || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/login?redirect=/academy/${course.id}`);
      return;
    }
    await enrollCourseBySlug(course.id);
    // Optionally redirect to the learning page or show a success message
    router.push(`/academy/learn/${course.id}`);
  };

  const handleGoToCourse = () => {
    router.push(`/academy/learn/${course.id}`);
  };

  const totalLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );
  const enrolled = isEnrolled(course.id);
  const progress = enrolled ? getCourseProgress(course.id) : 0;

  const getLessonIcon = (type: CourseLesson["type"]) => {
    switch (type) {
      case "video":
        return <FilmIcon className="w-5 h-5 text-primary mr-2 flex-shrink-0" />;
      case "text":
        return (
          <DocumentTextIcon className="w-5 h-5 text-secondary mr-2 flex-shrink-0" />
        );
      case "quiz":
        return (
          <LightBulbIcon className="w-5 h-5 text-accent mr-2 flex-shrink-0" />
        );
      default:
        return (
          <BookOpenIcon className="w-5 h-5 text-neutral-500 mr-2 flex-shrink-0" />
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <div className="lg:flex lg:space-x-8">
        {/* Main Content Area */}
        <div className="lg:w-2/3">
          <div className="mb-6">
            <nav
              aria-label="breadcrumb"
              className="text-sm text-neutral-500 mb-2"
            >
              <Link href="/academy" className="hover:underline">
                AI Academy
              </Link>
              <span className="mx-2">/</span>
              <span>{course.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
              {course.title}
            </h1>
            <p className="text-lg text-neutral-600 mb-4">
              {course.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-4">
              <span>
                Instructor:{" "}
                <span className="font-medium text-neutral-700">
                  {course.instructor}
                </span>
              </span>
              <span className="flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" /> 4.7 (Mock
                Rating)
              </span>
              <span className="flex items-center">
                <UsersIcon className="w-4 h-4 text-neutral-500 mr-1" /> 1,234
                Enrolled (Mock)
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full flex items-center"
                >
                  <TagIcon className="w-3 h-3 mr-1" /> {tag}
                </span>
              ))}
            </div>
          </div>

          {course.longDescription && (
            <div className="prose max-w-none mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-neutral-700 mb-3">
                Course Overview
              </h2>
              <p>{course.longDescription}</p>
            </div>
          )}

          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-neutral-700 mb-4 flex items-center">
                <CheckCircleIcon className="w-6 h-6 text-success mr-2" />
                What You Will Learn
              </h2>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 pl-2">
                {course.learningOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-neutral-700 mb-4 flex items-center">
              <ListBulletIcon className="w-6 h-6 text-primary mr-2" />
              Course Content
            </h2>
            <div className="text-sm text-neutral-600 mb-4">
              {course.modules.length} modules &bull; {totalLessons} lessons
              &bull; {course.estimatedDuration} total length
            </div>
            {course.modules.map((module: CourseModule) => (
              <div
                key={module.id}
                className="border border-neutral-200 rounded-md mb-3"
              >
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex justify-between items-center p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded-t-md"
                  aria-expanded={expandedModules[module.id] || false}
                >
                  <h3 className="text-lg font-medium text-neutral-700">
                    {module.title}
                  </h3>
                  {expandedModules[module.id] ? (
                    <ChevronUpIcon className="w-5 h-5 text-neutral-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-neutral-500" />
                  )}
                </button>
                {expandedModules[module.id] && (
                  <ul className="p-4 border-t border-neutral-200 bg-white rounded-b-md">
                    {module.lessons.map(
                      (lesson: CourseLesson, index: number) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between py-2.5 px-2 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50 rounded"
                        >
                          <div className="flex items-center">
                            {getLessonIcon(lesson.type)}
                            <span className="text-sm text-neutral-600">
                              {index + 1}. {lesson.title}
                            </span>
                          </div>
                          {/* Mock duration, replace with actual if available */}
                          <span className="text-xs text-neutral-500">
                            {lesson.type === "video"
                              ? "10min"
                              : lesson.type === "quiz"
                              ? "5 Qs"
                              : "5min read"}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-neutral-700 mb-4 flex items-center">
                <AcademicCapIcon className="w-6 h-6 text-secondary mr-2" />
                Prerequisites
              </h2>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 pl-2">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar / Call to Action Area */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 space-y-6">
            <Card className="shadow-xl">
              <div className="relative w-full h-56 mb-4">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-5">
                <div className="text-3xl font-bold text-neutral-800 mb-4">
                  Free
                </div>{" "}
                {/* Or course price */}
                {enrolled ? (
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleGoToCourse}
                    >
                      Go to Course
                    </Button>
                    <div className="mt-4">
                      <p className="text-sm text-neutral-600">
                        Your Progress:{" "}
                      </p>
                      <div className="w-full bg-neutral-200 rounded-full h-2.5 my-1">
                        <div
                          className="bg-success h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {progress}% complete
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={() => unenrollCourse(course.id)}
                      className="mt-3 text-danger hover:bg-danger/10"
                    >
                      Unenroll
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleEnroll}
                    disabled={authLoading}
                  >
                    {authLoading ? <Spinner size="sm" /> : "Enroll Now"}
                  </Button>
                )}
                <div className="text-xs text-neutral-500 text-center mt-3">
                  30-Day Money-Back Guarantee (Mock)
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-700 mb-2">
                    This course includes:
                  </h4>
                  <ul className="space-y-1.5 text-sm text-neutral-600">
                    <li className="flex items-center">
                      <CalendarDaysIcon className="w-4 h-4 mr-2 text-primary" />{" "}
                      {course.estimatedDuration} on-demand video/text
                    </li>
                    <li className="flex items-center">
                      <DocumentTextIcon className="w-4 h-4 mr-2 text-primary" />{" "}
                      {totalLessons} articles/lessons
                    </li>
                    <li className="flex items-center">
                      <CpuChipIcon className="w-4 h-4 mr-2 text-primary" />{" "}
                      Access to coding exercises (if applicable)
                    </li>
                    <li className="flex items-center">
                      <AwardIcon className="w-4 h-4 mr-2 text-primary" />{" "}
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            {/* You can add more related content or CTAs here */}
          </div>
        </div>
      </div>
    </div>
  );
}
