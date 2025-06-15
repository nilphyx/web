import React from "react";
import Link from "next/link";
import { Course, CourseLesson } from "@/lib/types";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  FilmIcon,
  LightBulbIcon,
} from "@/components/icons";

type SidebarNavigationProps = {
  course: Course;
  currentLessonId: string;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  progress: number;
};

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  course,
  currentLessonId,
  isLessonCompleted,
  progress,
}) => {

  return (
    <aside className="w-64 overflow-y-auto bg-white border-r border-neutral-200 p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">{course.title}</h2>
      <div className="px-4 mb-3">
        <div className="w-full bg-neutral-300 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progress.toString()}%` }}
          ></div>
        </div>
        <p className="text-xs text-neutral-300 mt-1">{progress}% complete</p>
      </div>
      <nav className="space-y-6">
        {course.modules.map((module) => (
          <div key={module.id}>
            <h3 className="text-sm font-bold text-neutral-700 mb-2 uppercase tracking-wide">
              {module.title}
            </h3>
            <ul className="space-y-1">
              {module.lessons.map((lesson) => {
                const isActive = lesson.id === currentLessonId;
                const completed = isLessonCompleted(course.id, lesson.id);

                const icon =
                  lesson.type === "video" ? (
                    <FilmIcon className="w-4 h-4 mr-2 text-blue-500" />
                  ) : lesson.type === "text" ? (
                    <DocumentTextIcon className="w-4 h-4 mr-2 text-purple-500" />
                  ) : (
                    <LightBulbIcon className="w-4 h-4 mr-2 text-yellow-500" />
                  );

                return (
                  <li key={lesson.id}>
                    <Link
                      href={`/academy/learn/${course.id}/${module.id}/${lesson.id}`}
                      prefetch={true}
                      className={`flex items-center px-3 py-2 rounded text-sm font-medium transition ${
                        isActive
                          ? "bg-neutral-100 text-black"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      {icon}
                      <span className="flex-1 truncate">{lesson.title}</span>
                      {completed && (
                        <CheckCircleIcon className="w-4 h-4 ml-2 text-green-500" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarNavigation;

