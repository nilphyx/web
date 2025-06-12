import Link from 'next/link';
import { courses as allCoursesData } from '@/lib/data/courses';
import { Course } from '@/lib/types';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { BookOpenIcon, TagIcon, AcademicCapIcon, StarIcon } from '@/components/icons';
import Image from 'next/image';

export const metadata = {
  title: 'AI Academy - All Courses',
  description: 'Explore a wide range of courses in Artificial Intelligence, Machine Learning, and more.',
};

export default async function CourseListPage() {
  // In a real app, fetch courses from an API
  const courses: Course[] = allCoursesData;

  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <section className="text-center mb-12">
        <AcademicCapIcon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-neutral-800 mb-3">AI Academy</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Discover your path in AI. From beginner fundamentals to advanced
          specializations, find the perfect course to achieve your learning
          goals.
        </p>
      </section>

      {/* TODO: Add search and filter functionality here */}
      {/* <div className="mb-8 p-4 bg-white shadow rounded-lg">
        Search/Filter component placeholder
      </div> */}

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="flex flex-col transform hover:scale-105 transition-transform duration-300"
            >
              <Link
                href={`/academy/${course.id}`}
                prefetch={true}
                className="block"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {course.category}
                  </span>
                  <span className="ml-2 inline-block bg-accent/20 text-accent-dark text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {course.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2 hover:text-primary transition-colors">
                  <Link href={`/academy/${course.id}`} prefetch={true}>
                    {course.title}
                  </Link>
                </h3>
                <p className="text-sm text-neutral-600 mb-3 flex-grow">
                  {course.description}
                </p>
                <div className="text-xs text-neutral-500 mb-1">
                  By {course.instructor}
                </div>
                <div className="flex items-center text-xs text-neutral-500 mb-4">
                  <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>
                    4.7 (3,280 ratings) &middot; {course.estimatedDuration}
                  </span>{" "}
                  {/* Mock ratings */}
                </div>

                <div className="mt-auto">
                  <Button variant="primary" fullWidth asChild>
                    <Link href={`/academy/${course.id}`} prefetch={true}>
                      View Details
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full flex items-center"
                    >
                      <TagIcon className="w-3 h-3 mr-1" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpenIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-700 mb-2">
            No Courses Available
          </h2>
          <p className="text-neutral-500">
            Check back soon for new and exciting AI courses!
          </p>
        </div>
      )}
    </div>
  );
}
