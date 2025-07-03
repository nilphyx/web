"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  User,
  AuthState as AuthStateType,
  EnrolledCourse,
  Course,
  Certificate,
  CourseProgress,
  Quiz,
  UserQuizSubmission,
} from "@/lib/types";
import {
  // courses as courses,
  quizzes as allQuizzesData,
} from "@/lib/data/courses";
import { mockIssuedCertificates } from "@/lib/data/issuedCertificates";
import { createClient } from "@/utils/supabase/client";
import { getCourses } from "../actions/getCourses";

// Exporting AuthState enum
export enum AuthState {
  LOADING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

interface AuthContextType {
  user: User | null;
  authState: AuthStateType;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  enrollCourse: (courseId: string) => Promise<void>;
  enrollCourseBySlug: (courseId: string) => Promise<void>;
  unenrollCourse: (courseId: string) => Promise<void>;
  isEnrolled: (courseId: string) => Promise<boolean>;
  // isEnrolled: (courseId: string) => boolean;
  enrolledCourses: EnrolledCourse[];
  completeLesson: (courseId: string, lessonId: string) => Promise<void>;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
  submitQuiz: (
    quizId: string,
    answers: { questionId: string; answer: string | string[] }[]
  ) => Promise<UserQuizSubmission | null>;
  getQuizSubmission: (quizId: string) => UserQuizSubmission | null;
  generateCertificate: (courseId: string) => Promise<Certificate | null>;
  getCertificate: (courseId: string) => Certificate | null;
  issuedCertificates: Certificate[];
  verifyCertificateCode: (code: string) => Certificate | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_ENROLLED_COURSES_KEY = "aiPlatformEnrolledCourses";
const LOCAL_STORAGE_COURSE_PROGRESS_KEY = "aiPlatformCourseProgress";
const LOCAL_STORAGE_QUIZ_SUBMISSIONS_KEY = "aiPlatformQuizSubmissions";
const LOCAL_STORAGE_CERTIFICATES_KEY = "aiPlatformCertificates";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>(AuthState.LOADING);
  const [enrolledCoursesData, setEnrolledCoursesData] = useState<string[]>([]);
  const [courseProgressData, setCourseProgressData] = useState<CourseProgress>(
    {}
  );
  const [quizSubmissionsData, setQuizSubmissionsData] = useState<
    UserQuizSubmission[]
  >([]);
  const [issuedCertificatesData, setIssuedCertificatesData] = useState<
    Certificate[]
  >(mockIssuedCertificates);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name:
              session.user.user_metadata?.name ||
              session.user.email!.split("@")[0],
            isAdmin: session.user.user_metadata?.isAdmin || false,
          });
          setAuthState(AuthState.AUTHENTICATED);
          // Fetch enrollments and other data
          await fetchEnrollments();
        } else {
          setUser(null);
          setAuthState(AuthState.UNAUTHENTICATED);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        setAuthState(AuthState.UNAUTHENTICATED);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name:
            session.user.user_metadata?.name ||
            session.user.email!.split("@")[0],
          isAdmin: session.user.user_metadata?.isAdmin || false,
        });
        setAuthState(AuthState.AUTHENTICATED);
      } else {
        setUser(null);
        setAuthState(AuthState.UNAUTHENTICATED);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const storedEnrolledCourses = localStorage.getItem(
      LOCAL_STORAGE_ENROLLED_COURSES_KEY
    );
    const storedCourseProgress = localStorage.getItem(
      LOCAL_STORAGE_COURSE_PROGRESS_KEY
    );
    const storedQuizSubmissions = localStorage.getItem(
      LOCAL_STORAGE_QUIZ_SUBMISSIONS_KEY
    );
    const storedCertificates = localStorage.getItem(
      LOCAL_STORAGE_CERTIFICATES_KEY
    );

    if (storedEnrolledCourses)
      setEnrolledCoursesData(JSON.parse(storedEnrolledCourses));
    if (storedCourseProgress)
      setCourseProgressData(JSON.parse(storedCourseProgress));
    if (storedQuizSubmissions)
      setQuizSubmissionsData(JSON.parse(storedQuizSubmissions));
    if (storedCertificates)
      setIssuedCertificatesData(JSON.parse(storedCertificates));
    else
      localStorage.setItem(
        LOCAL_STORAGE_CERTIFICATES_KEY,
        JSON.stringify(mockIssuedCertificates)
      );
  }, []);

  const updateLocalStorage = useCallback(() => {
    localStorage.setItem(
      LOCAL_STORAGE_ENROLLED_COURSES_KEY,
      JSON.stringify(enrolledCoursesData)
    );
    localStorage.setItem(
      LOCAL_STORAGE_COURSE_PROGRESS_KEY,
      JSON.stringify(courseProgressData)
    );
    localStorage.setItem(
      LOCAL_STORAGE_QUIZ_SUBMISSIONS_KEY,
      JSON.stringify(quizSubmissionsData)
    );
    localStorage.setItem(
      LOCAL_STORAGE_CERTIFICATES_KEY,
      JSON.stringify(issuedCertificatesData)
    );
  }, [
    enrolledCoursesData,
    courseProgressData,
    quizSubmissionsData,
    issuedCertificatesData,
  ]);

  useEffect(() => {
    updateLocalStorage();
  }, [updateLocalStorage]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const courses = await getCourses();
        setCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (pathname === "/login" || pathname === "/signup") {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setAuthState(AuthState.UNAUTHENTICATED);
      setEnrolledCoursesData([]);
      setCourseProgressData({});
      setQuizSubmissionsData([]);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // const enrollCourse = async (courseId: string) => {
  //   if (!user) return;
  //   if (!enrolledCoursesData.includes(courseId)) {
  //     setEnrolledCoursesData((prev) => [...prev, courseId]);
  //     setCourseProgressData((prev) => ({
  //       ...prev,
  //       [courseId]: { completedLessons: [] },
  //     }));
  //   }
  // };

  const enrollCourse = async (courseId: string) => {
    if (!user) return;

    // get the user enrollment status from DB
    const alreadyEnrolled = await isEnrolled(courseId);
    console.log("Already enrolled:", alreadyEnrolled, "for courseId:", courseId);
    if (alreadyEnrolled) return;
    // Create enrollment in DB
    const { error } = await supabase.from("enrollments").insert([
      {
        student_id: user.id,
        course_id: courseId,
        enrolled_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Enrollment error:", error.message);
      return;
    }

    // Update local state
    setEnrolledCoursesData((prev) => [...prev, courseId]);
    setCourseProgressData((prev) => ({
      ...prev,
      [courseId]: { completedLessons: [] },
    }));
  };

  const enrollCourseBySlug = async (slug: string) => {
    console.log("Enrolling in course with slug:", slug);
    console.log("Available courses:", courses);
    const course = courses.find((c) => c.slug === slug);
    console.log("Found course:", course);
    if (!course) {
      console.error("Course not found for slug:", slug);
      return;
    }
    await enrollCourse(course.id);
  };

  const unenrollCourse = async (courseId: string) => {
    if (!user) return;

    // Remove from DB
    const { error } = await supabase
      .from("enrollments")
      .delete()
      .eq("student_id", user.id)
      .eq("course_id", courseId);

    if (error) {
      console.error("Unenrollment error:", error.message);
      return;
    }

    // Update local state
    setEnrolledCoursesData((prev) => prev.filter((id) => id !== courseId));
    setCourseProgressData((prev) => {
      const newProgress = { ...prev };
      delete newProgress[courseId];
      return newProgress;
    });

    setQuizSubmissionsData((prev) =>
      prev.filter((submission) => {
        const quiz = allQuizzesData.find((q) => q.id === submission.quizId);
        return !(quiz && quiz.courseId === courseId);
      })
    );

    setIssuedCertificatesData((prev) =>
      prev.filter(
        (cert) => cert.courseId !== courseId || cert.userId !== user.id
      )
    );
  };

  async function isEnrolled(courseId: string): Promise<boolean> {
    if (!user) return false;

    const { data, error } = await supabase
      .from("enrollments")
      .select("id")
      .eq("course_id", courseId)
      .eq("student_id", user.id)
      .single();

    if (error) {
      // log or handle errors
      if (error.code !== "PGRST116")
        console.error("Enrollment check failed:", error.message);
      return false;
    }

    return !!data;
  }

  // const isEnrolled = (courseId: string) =>
  //   enrolledCoursesData.includes(courseId);

  // const unenrollCourse = async (courseId: string) => {
  //   if (!user) return;
  //   setEnrolledCoursesData((prev) => prev.filter((id) => id !== courseId));
  //   setCourseProgressData((prev) => {
  //     const newProgress = { ...prev };
  //     delete newProgress[courseId];
  //     return newProgress;
  //   });
  //   setQuizSubmissionsData((prev) =>
  //     prev.filter((submission) => {
  //       const quiz = allQuizzesData.find((q) => q.id === submission.quizId);
  //       return !(quiz && quiz.courseId === courseId);
  //     })
  //   );
  //   setIssuedCertificatesData((prev) =>
  //     prev.filter(
  //       (cert) => cert.courseId !== courseId || cert.userId !== user.id
  //     )
  //   );
  // };

  // const fetchEnrollments = async () => {
  //   if (!user) return;

  //   const { data, error } = await supabase
  //     .from("enrollments")
  //     .select("course_id, completed_at, certificate_id")
  //     .eq("student_id", user.id);

  //   if (error) {
  //     console.error("Error fetching enrollments:", error.message);
  //     return;
  //   }

  //   const enrolledCourseIds = data.map((enroll) => enroll.course_id);
  //   setEnrolledCoursesData(enrolledCourseIds);
  //   // optionally populate courseProgressData based on lesson_progress table too
  // };
  const fetchEnrollments = async () => {
    if (!user) return;

    try {
      // 1. Fetch enrollments
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from("enrollments")
        .select("course_id");

      if (enrollmentsError) throw enrollmentsError;

      const enrolledCourseIds = enrollments.map((e) => e.course_id);
      setEnrolledCoursesData(enrolledCourseIds);

      // 2. Fetch lesson progress
      const { data: progressData, error: progressError } = await supabase
        .from("lesson_progress")
        .select("course_id, lesson_id")
        .eq("user_id", user.id);

      if (progressError) throw progressError;

      const courseProgressMap: CourseProgress = {};
      for (const item of progressData) {
        if (!courseProgressMap[item.course_id]) {
          courseProgressMap[item.course_id] = { completedLessons: [] };
        }
        courseProgressMap[item.course_id].completedLessons.push(item.lesson_id);
      }
      setCourseProgressData(courseProgressMap);

      // 3. Fetch issued certificates
      // const { data: certData, error: certError } = await supabase
      //   .from("certificates")
      //   .select("id, course_id, user_id")
      //   .eq("user_id", user.id);
      //     const { data: certData, error: certError } = await supabase
      //       .from("certificates")
      //       .select(
      //         `
      //   id,
      //   issued_at,
      //   certificate_url,
      //   enrollment_id,
      //   enrollments (
      //     course_id,
      //     student_id,
      //     courses (
      //       title
      //     ),
      //     users:student_id (
      //       first_name,
      //       last_name
      //     )
      //   )
      // `
      //       )
      //       .eq("enrollments.student_id", user.id);

      //     if (certError) throw certError;

      //     const enrichedCertificates: Certificate[] = (certData || []).map(
      //       (cert) => {
      //         const enrollment = cert.enrollments;
      //         const course = enrollment?.courses;
      //         const user = enrollment?.users;

      //         return {
      //           id: cert.id,
      //           userId: enrollment?.student_id || "",
      //           courseId: enrollment?.course_id || "",
      //           courseTitle: course?.title || "Untitled Course",
      //           userName:
      //             [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
      //             "Unknown",
      //           issueDate: cert.issued_at,
      //           verificationCode: cert.certificate_url?.split("/").pop() || cert.id, // or however your verificationCode is generated
      //         };
      //       }
      //     );

      //     setIssuedCertificatesData(enrichedCertificates);

      // setIssuedCertificatesData(certData || []);

      // 4. Update localStorage
      updateLocalStorage();
    } catch (error) {
      console.error("Error in fetchEnrollments:", error);
    }
  };

  const getCourseProgress = (courseId: string): number => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;
    const progress = courseProgressData[courseId];
    if (!progress || !progress.completedLessons) return 0;

    let totalLessons = 0;
    course.modules.forEach((module) => {
      totalLessons += module.lessons.length;
    });
    if (totalLessons === 0) return 0;
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  const getCertificate = (courseId: string): Certificate | null => {
    if (!user) return null;
    return (
      issuedCertificatesData.find(
        (c) => c.userId === user.id && c.courseId === courseId
      ) || null
    );
  };

  const enrolledCourses: EnrolledCourse[] = enrolledCoursesData
    .map((id) => {
      const course = courses.find((c) => c.id === id);
      if (!course) return null;
      return {
        ...course,
        enrollmentDate: new Date().toISOString(), // Placeholder
        progress: getCourseProgress(id),
        completedLessons: courseProgressData[id]?.completedLessons || [],
        certificateId: getCertificate(id)?.id,
      };
    })
    .filter(Boolean) as EnrolledCourse[];

  const completeLesson = async (courseId: string, lessonId: string) => {
    const enrolled = await isEnrolled(courseId);

    if (!user || !enrolled) return;
    setCourseProgressData((prev) => {
      const currentProgress = prev[courseId] || { completedLessons: [] };
      if (!currentProgress.completedLessons.includes(lessonId)) {
        return {
          ...prev,
          [courseId]: {
            ...currentProgress,
            completedLessons: [...currentProgress.completedLessons, lessonId],
          },
        };
      }
      return prev;
    });
  };

  const isLessonCompleted = (courseId: string, lessonId: string) => {
    return (
      courseProgressData[courseId]?.completedLessons.includes(lessonId) || false
    );
  };

  const submitQuiz = async (
    quizId: string,
    answers: { questionId: string; answer: string | string[] }[]
  ): Promise<UserQuizSubmission | null> => {
    if (!user) return null;
    const quiz = allQuizzesData.find((q) => q.id === quizId);
    if (!quiz) return null;

    let correctAnswersCount = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers.find(
        (a) => a.questionId === question.id
      )?.answer;
      if (userAnswer !== undefined) {
        if (Array.isArray(question.correctAnswer)) {
          if (
            Array.isArray(userAnswer) &&
            userAnswer.length === question.correctAnswer.length &&
            userAnswer.every((val) => question.correctAnswer.includes(val))
          ) {
            correctAnswersCount++;
          }
        } else {
          if (userAnswer === question.correctAnswer) {
            correctAnswersCount++;
          }
        }
      }
    });

    const score = Math.round(
      (correctAnswersCount / quiz.questions.length) * 100
    );
    const submission: UserQuizSubmission = {
      userId: user.id,
      quizId,
      answers,
      score,
      submittedAt: new Date().toISOString(),
    };
    setQuizSubmissionsData((prev) => [
      ...prev.filter((s) => s.quizId !== quizId || s.userId !== user.id),
      submission,
    ]); // Overwrite previous submission
    return submission;
  };

  const getQuizSubmission = (quizId: string): UserQuizSubmission | null => {
    if (!user) return null;
    return (
      quizSubmissionsData.find(
        (s) => s.quizId === quizId && s.userId === user.id
      ) || null
    );
  };

  const generateCertificate = async (
    courseId: string
  ): Promise<Certificate | null> => {
    if (!user) return null;
    const enrolled = await isEnrolled(courseId);
    if (!enrolled || getCourseProgress(courseId) < 100) return null;

    const existingCertificate = issuedCertificatesData.find(
      (c) => c.userId === user.id && c.courseId === courseId
    );
    if (existingCertificate) return existingCertificate;

    const course = courses.find((c) => c.id === courseId);
    if (!course) return null;

    const newCertificate: Certificate = {
      id: `cert-${user.id}-${courseId}-${Date.now()}`,
      userId: user.id,
      courseId,
      courseTitle: course.title,
      userName: user.name || user.email,
      issueDate: new Date().toISOString(),
      verificationCode: `VERIFY-${courseId
        .toUpperCase()
        .slice(0, 5)}-${user.id.slice(0, 5)}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`,
    };
    setIssuedCertificatesData((prev) => [...prev, newCertificate]);
    return newCertificate;
  };

  const verifyCertificateCode = (code: string): Certificate | null => {
    return (
      issuedCertificatesData.find((c) => c.verificationCode === code) || null
    );
  };

  const value = {
    user,
    authState,
    isLoading,
    login,
    signup,
    logout,
    enrollCourse,
    unenrollCourse,
    enrollCourseBySlug,
    isEnrolled,
    enrolledCourses,
    completeLesson,
    isLessonCompleted,
    getCourseProgress,
    submitQuiz,
    getQuizSubmission,
    generateCertificate,
    getCertificate,
    issuedCertificates: issuedCertificatesData,
    verifyCertificateCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
