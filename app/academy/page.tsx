import CourseListPage from "@/components/CourseListPage";
import { getCourses } from "@/lib/actions/getCourses";

export const metadata = {
  title: "AI Academy - All Courses",
  description:
    "Explore a wide range of courses in Artificial Intelligence, Machine Learning, and more.",
};

export default async function AcademyPage() {
  return <CourseListPage  />;
}
