// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useParams, useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import ProtectedRouteClient from "@/components/ProtectedRouteClient";
// import { useAuth } from "@/lib/hooks/useAuth";
// import {
//   courses as allCoursesData,
//   quizzes as allQuizzesData,
// } from "@/lib/data/courses";
// import {
//   Course,
//   CourseModule,
//   CourseLesson,
//   Quiz,
//   UserQuizSubmission,
// } from "@/lib/types";
// import Spinner from "@/components/Spinner";
// import { Button } from "@/components/Button";
// import QuizRenderer from "@/components/QuizRenderer";
// import {
//   DocumentTextIcon,
//   FilmIcon,
//   LightBulbIcon,
//   CheckCircleIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ListBulletIcon,
//   XCircleIcon,
//   AcademicCapIcon,
//   AwardIcon,
// } from "@/components/icons";

// function EnrolledCourseViewerPageContent() {
//   const params = useParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   const courseId = params.courseId as string;
//   const moduleId = params.moduleId as string;
//   const lessonId = params.lessonId as string;

//   const {
//     user,
//     isEnrolled,
//     completeLesson,
//     isLessonCompleted,
//     getCourseProgress,
//     generateCertificate,
//     getCertificate,
//   } = useAuth();

//   const [course, setCourse] = useState<Course | null>(null);
//   const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
//   const [currentLesson, setCurrentLesson] = useState<CourseLesson | null>(null);
//   const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on desktop
//   const [certificateEarned, setCertificateEarned] =
//     useState<ReturnType<typeof getCertificate>>(null);

//   useEffect(() => {
//     const foundCourse = allCoursesData.find((c) => c.id === courseId);
//     if (foundCourse) {
//       setCourse(foundCourse);
//       const foundModule = foundCourse.modules.find((m) => m.id === moduleId);
//       if (foundModule) {
//         setCurrentModule(foundModule);
//         const foundLesson = foundModule.lessons.find((l) => l.id === lessonId);
//         if (foundLesson) {
//           setCurrentLesson(foundLesson);
//           if (foundLesson.type === "quiz" && foundLesson.quizId) {
//             const quizData = allQuizzesData.find(
//               (q) => q.id === foundLesson.quizId
//             );
//             setCurrentQuiz(quizData || null);
//           } else {
//             setCurrentQuiz(null);
//           }
//         } else {
//           router.replace(`/academy/my-courses?error=lesson_not_found`);
//         }
//       } else {
//         router.replace(`/academy/my-courses?error=module_not_found`);
//       }
//     } else {
//       router.replace(`/academy/my-courses?error=course_not_found`);
//     }
//   }, [courseId, moduleId, lessonId, router]);

//   useEffect(() => {
//     if (course && user) {
//       setCertificateEarned(getCertificate(course.id));
//     }
//   }, [course, user, getCertificate, getCourseProgress]);

//   const courseNavigation = useMemo(() => {
//     if (!course)
//       return { prevLesson: null, nextLesson: null, allLessonsFlat: [] };
//     const allLessonsFlat: {
//       module: CourseModule;
//       lesson: CourseLesson;
//       moduleIndex: number;
//       lessonIndex: number;
//     }[] = [];
//     course.modules.forEach((mod, modIdx) => {
//       mod.lessons.forEach((les, lesIdx) => {
//         allLessonsFlat.push({
//           module: mod,
//           lesson: les,
//           moduleIndex: modIdx,
//           lessonIndex: lesIdx,
//         });
//       });
//     });
//     const currentIndex = allLessonsFlat.findIndex(
//       (l) => l.lesson.id === lessonId
//     );
//     const prevLesson =
//       currentIndex > 0 ? allLessonsFlat[currentIndex - 1] : null;
//     const nextLesson =
//       currentIndex < allLessonsFlat.length - 1
//         ? allLessonsFlat[currentIndex + 1]
//         : null;
//     return { prevLesson, nextLesson, allLessonsFlat };
//   }, [course, lessonId]);

//   const handleCompleteAndContinue = async () => {
//     if (
//       course &&
//       currentLesson &&
//       !isLessonCompleted(course.id, currentLesson.id)
//     ) {
//       await completeLesson(course.id, currentLesson.id);
//     }
//     if (courseNavigation.nextLesson) {
//       const { module, lesson } = courseNavigation.nextLesson;
//       router.push(`/academy/learn/${course!.id}/${module.id}/${lesson.id}`);
//     } else {
//       // Last lesson, check for certificate
//       if (
//         course &&
//         getCourseProgress(course.id) === 100 &&
//         !certificateEarned
//       ) {
//         const newCert = await generateCertificate(course.id);
//         if (newCert) setCertificateEarned(newCert);
//       }
//       // router.push(`/academy/my-courses?course_completed=${course!.id}`);
//     }
//   };

//   const handleQuizComplete = async (submission: UserQuizSubmission) => {
//     console.log("Quiz completed with score:", submission.score);
//     if (
//       submission.score >= 70 &&
//       course &&
//       currentLesson &&
//       !isLessonCompleted(course.id, currentLesson.id)
//     ) {
//       // Mark lesson as complete if quiz passed
//       await completeLesson(course.id, currentLesson.id);
//     }
//     // Potentially auto-navigate or enable next button based on score
//     if (courseNavigation.nextLesson) {
//       // Enable a "Next Lesson" button or auto-navigate if desired
//     } else if (
//       course &&
//       getCourseProgress(course.id) === 100 &&
//       !certificateEarned
//     ) {
//       const newCert = await generateCertificate(course.id);
//       if (newCert) setCertificateEarned(newCert);
//     }
//   };

//   const getLessonIcon = (type: CourseLesson["type"], completed: boolean) => {
//     if (completed)
//       return (
//         <CheckCircleIcon className="w-5 h-5 text-success mr-2 flex-shrink-0" />
//       );
//     switch (type) {
//       case "video":
//         return <FilmIcon className="w-5 h-5 text-primary mr-2 flex-shrink-0" />;
//       case "text":
//         return (
//           <DocumentTextIcon className="w-5 h-5 text-secondary mr-2 flex-shrink-0" />
//         );
//       case "quiz":
//         return (
//           <LightBulbIcon className="w-5 h-5 text-accent mr-2 flex-shrink-0" />
//         );
//       default:
//         return <div className="w-5 h-5 mr-2 flex-shrink-0" />; // Placeholder
//     }
//   };

//   if (!user || !course || !currentModule || !currentLesson) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner size="lg" />
//       </div>
//     );
//   }
//   if (!isEnrolled(course.id)) {
//     // This case should ideally be caught by ProtectedRoute or a higher-level check
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
//         <XCircleIcon className="w-16 h-16 text-danger mb-4" />
//         <h2 className="text-2xl font-semibold text-neutral-800 mb-2">
//           Access Denied
//         </h2>
//         <p className="text-neutral-600 mb-6">
//           You are not enrolled in this course. Please enroll to access the
//           content.
//         </p>
//         <Button variant="primary" asChild>
//           <Link href={`/academy/${courseId}`}>Go to Course Page</Link>
//         </Button>
//       </div>
//     );
//   }

//   const overallProgress = getCourseProgress(course.id);

//   return (
//     <div className="flex h-[calc(100vh-64px)]">
//       {" "}
//       {/* Adjust 64px based on actual header height */}
//       {/* Sidebar */}
//       <aside
//         className={`bg-neutral-800 text-white transition-all duration-300 ease-in-out ${
//           isSidebarOpen ? "w-72 md:w-80" : "w-0 md:w-16"
//         } overflow-y-auto custom-scrollbar flex flex-col`}
//       >
//         <div
//           className={`p-4 flex items-center justify-between ${
//             isSidebarOpen ? "" : "md:justify-center"
//           }`}
//         >
//           <Link
//             href={`/academy/${courseId}`}
//             className={`font-semibold text-lg hover:text-primary transition-colors ${
//               isSidebarOpen ? "" : "md:hidden"
//             }`}
//           >
//             {course.title}
//           </Link>
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="p-1 rounded hover:bg-neutral-700"
//           >
//             {isSidebarOpen ? (
//               <ChevronLeftIcon className="w-6 h-6" />
//             ) : (
//               <ListBulletIcon className="w-6 h-6" />
//             )}
//           </button>
//         </div>
//         {isSidebarOpen && (
//           <>
//             <div className="px-4 mb-3">
//               <div className="w-full bg-neutral-600 rounded-full h-2">
//                 <div
//                   className="bg-success h-2 rounded-full"
//                   style={{ width: `${overallProgress}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-neutral-300 mt-1">
//                 {overallProgress}% complete
//               </p>
//             </div>
//             <nav className="flex-grow">
//               {course.modules.map((module) => (
//                 <div key={module.id} className="mb-1">
//                   <h4 className="px-4 py-2 text-sm font-medium text-neutral-400 bg-neutral-700/50">
//                     {module.title}
//                   </h4>
//                   <ul>
//                     {module.lessons.map((lesson) => {
//                       const isActive = lesson.id === currentLesson.id;
//                       const completed = isLessonCompleted(course.id, lesson.id);
//                       return (
//                         <li key={lesson.id}>
//                           <Link
//                             href={`/academy/learn/${course.id}/${module.id}/${lesson.id}`}
//                             className={`flex items-center px-4 py-2.5 text-sm hover:bg-neutral-700 transition-colors ${
//                               isActive
//                                 ? "bg-primary text-white font-semibold"
//                                 : "text-neutral-300"
//                             }`}
//                           >
//                             {getLessonIcon(lesson.type, completed)}
//                             <span className="truncate">{lesson.title}</span>
//                           </Link>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 </div>
//               ))}
//             </nav>
//           </>
//         )}
//         {!isSidebarOpen && (
//           <nav className="flex-grow mt-4 md:flex flex-col items-center space-y-3 hidden">
//             {course.modules.map((module) =>
//               module.lessons.map((lesson) => {
//                 const isActive = lesson.id === currentLesson.id;
//                 const completed = isLessonCompleted(course.id, lesson.id);
//                 return (
//                   <Link
//                     key={lesson.id}
//                     href={`/academy/learn/${course.id}/${module.id}/${lesson.id}`}
//                     title={lesson.title}
//                     className={`p-2 rounded-md hover:bg-neutral-700 ${
//                       isActive ? "bg-primary" : ""
//                     }`}
//                   >
//                     {getLessonIcon(lesson.type, completed)}
//                   </Link>
//                 );
//               })
//             )}
//           </nav>
//         )}
//       </aside>
//       {/* Main Content Area */}
//       <main className="flex-grow p-6 md:p-10 overflow-y-auto bg-neutral-50">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1">
//             {currentLesson.title}
//           </h1>
//           <p className="text-sm text-neutral-500 mb-6">
//             Module: {currentModule.title}
//           </p>

//           {currentLesson.type === "video" && currentLesson.videoId && (
//             <div className="aspect-video mb-6 rounded-lg overflow-hidden shadow-lg">
//               <iframe
// className="w-full h-full"
// src={`https://www.youtube.com/embed/${currentLesson.videoId}`}
// title={currentLesson.title}
// frameBorder="0"
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// allowFullScreen
//               ></iframe>
//             </div>
//           )}

//           {currentLesson.type === "text" && (
//             <div className="prose max-w-none p-6 bg-white shadow-lg rounded-lg mb-6">
//               {/* Render markdown here. For simplicity, using pre-wrap. Use a library like 'react-markdown' for full support. */}
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: currentLesson.content.replace(/\n/g, "<br />"),
//                 }}
//               />
//             </div>
//           )}

//           {currentLesson.type === "quiz" && currentQuiz && (
//             <QuizRenderer
//               quiz={currentQuiz}
//               onQuizComplete={handleQuizComplete}
//             />
//           )}

//           {!currentLesson.type && (
//             <p className="text-neutral-600">{currentLesson.content}</p>
//           )}

//           {overallProgress === 100 && certificateEarned && (
//             <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center shadow-md">
//               <AwardIcon className="w-12 h-12 text-success mx-auto mb-3" />
//               <h3 className="text-xl font-semibold text-green-700 mb-2">
//                 Congratulations! You&apos;ve earned a certificate!
//               </h3>
//               <p className="text-green-600 mb-3">
//                 You have successfully completed {course.title}.
//               </p>
//               <p className="text-sm text-neutral-600 mb-1">
//                 Verification Code:{" "}
//                 <code className="text-xs bg-neutral-100 p-1 rounded">
//                   {certificateEarned.verificationCode}
//                 </code>
//               </p>
//               <Button variant="primary" asChild className="mt-3">
//                 <Link href="/profile">View Certificate in Profile</Link>
//               </Button>
//             </div>
//           )}

//           {/* Navigation Buttons */}
//           <div className="mt-10 flex justify-between items-center">
//             {courseNavigation.prevLesson ? (
//               <Button variant="outline" asChild>
//                 <Link
//                   href={`/academy/learn/${course.id}/${courseNavigation.prevLesson.module.id}/${courseNavigation.prevLesson.lesson.id}`}
//                 >
//                   <ChevronLeftIcon className="w-5 h-5 mr-2" /> Prev
//                 </Link>
//               </Button>
//             ) : (
//               <div></div> // Placeholder for alignment
//             )}

//             <Button
//               variant="primary"
//               onClick={handleCompleteAndContinue}
//               disabled={
//                 currentLesson.type === "quiz" &&
//                 !isLessonCompleted(
//                   course.id,
//                   currentLesson.id
//                 ) /* Disable if quiz not passed and required to pass */
//               }
//             >
//               {isLessonCompleted(course.id, currentLesson.id)
//                 ? "Completed"
//                 : "Mark as Complete"}
//               {courseNavigation.nextLesson ? (
//                 <ChevronRightIcon className="w-5 h-5 ml-2" />
//               ) : overallProgress === 100 ? (
//                 <AcademicCapIcon className="w-5 h-5 ml-2" />
//               ) : (
//                 <CheckCircleIcon className="w-5 h-5 ml-2" />
//               )}
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default function EnrolledCourseViewerPage() {
//   return (
//     <ProtectedRouteClient>
//       <EnrolledCourseViewerPageContent />
//     </ProtectedRouteClient>
//   );
// }

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

async function EnrolledCourseViewerPageContent() {
  const { courseId, moduleId, lessonId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const courses = await getCourses();

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

  useEffect(() => {
    const course = courses.find((c) => c.id === courseId);
    if (!course)
      return router.replace("/academy/my-courses?error=course_not_found");

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
  }, [courseId, moduleId, lessonId, router]);

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
