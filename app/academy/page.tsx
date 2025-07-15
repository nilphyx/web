import CourseListPage from "@/components/CourseListPage";
import { getCourses } from "@/lib/actions/getCourses";

export const metadata = {
  title: "AI Academy - All Courses",
  description:
    "Explore a wide range of courses in Artificial Intelligence, Machine Learning, and more.",
};

export default async function AcademyPage() {
  // In a real app, fetch courses from an API
  const courses = await getCourses();
  console.log("[CourseListPage] Courses:", courses);
  // cour s e s={cour s;es}
  return <CourseListPage  />;
}
