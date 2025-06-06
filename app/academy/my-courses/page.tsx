'use client';

import React from 'react';
import Link from 'next/link';
import ProtectedRouteClient from '@/components/ProtectedRouteClient';
import { useAuth } from '@/lib/hooks/useAuth';
import { EnrolledCourse } from '@/lib/types';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Spinner from '@/components/Spinner';
import { AcademicCapIcon, BookOpenIcon, CheckCircleIcon, AwardIcon } from '@/components/icons';
import Image from 'next/image';

function MyCoursesPageContent() {
  const { user, enrolledCourses, isLoading: authLoading, getCertificate } = useAuth(); // isLoading is now correctly destructured

  if (authLoading || !user) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"><Spinner size="lg" /></div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <div className="mb-10 text-center">
        <AcademicCapIcon className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-neutral-800 mb-3">My Enrolled Courses</h1>
        <p className="text-lg text-neutral-600">
          Continue your learning journey and track your progress.
        </p>
      </div>

      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course: EnrolledCourse) => {
            const certificate = getCertificate(course.id);
            return (
            <Card key={course.id} className="flex flex-col transform hover:scale-105 transition-transform duration-300">
              <Link href={`/academy/learn/${course.id}`}>
                <div className="relative w-full h-56">
                   <Image 
                    src={course.imageUrl} 
                    alt={course.title} 
                    fill
                    style={{objectFit: 'cover'}}
                    className="rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2 hover:text-primary transition-colors">
                  <Link href={`/academy/learn/${course.id}`}>{course.title}</Link>
                </h3>
                <p className="text-sm text-neutral-500 mb-2">{course.category}</p>
                
                <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-1">
                  <div 
                    className={`h-2.5 rounded-full ${course.progress === 100 ? 'bg-success' : 'bg-primary'}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-neutral-500 mb-4">{course.progress}% complete</p>

                {course.progress === 100 && certificate && (
                  <div className="my-2 p-2 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 flex items-center">
                    <AwardIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span>Certificate Earned!</span>
                  </div>
                )}

                <div className="mt-auto">
                  <Button variant="primary" fullWidth asChild>
                    <Link href={`/academy/learn/${course.id}`}>
                      {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white shadow-lg rounded-lg">
          <BookOpenIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-700 mb-3">No Courses Yet!</h2>
          <p className="text-neutral-500 mb-6 max-w-md mx-auto">
            You haven't enrolled in any courses. Explore our catalog and start your learning adventure today!
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/academy">Browse Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function MyCoursesPage() {
  return (
    <ProtectedRouteClient>
      <MyCoursesPageContent />
    </ProtectedRouteClient>
  );
}