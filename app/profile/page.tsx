'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ProtectedRouteClient from '@/components/ProtectedRouteClient';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { UserCircleIcon, EnvelopeIcon, AcademicCapIcon, CheckCircleIcon, AwardIcon } from '@/components/icons';
import { Certificate, EnrolledCourse } from '@/lib/types';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

function ProfilePageContent() {
  const { user, enrolledCourses, issuedCertificates, logout } = useAuth();
  const [userName, setUserName] = useState(user?.name || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setUserEmail(user.email || '');
    }
  }, [user]);

  const handleSave = () => {
    // In a real app, you'd call an updateProfile function from useAuth
    // For this mock, we can update the local state if needed, but useAuth manages the actual user object
    console.log('Profile saved (mock):', { name: userName, email: userEmail });
    setIsEditing(false);
    // Potentially: auth.updateProfile({ name: userName, email: userEmail });
  };

  if (!user) {
    return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <UserCircleIcon className="w-24 h-24 md:w-32 md:h-32 text-primary mb-4 md:mb-0 md:mr-8" />
          <div className="text-center md:text-left flex-grow">
            {isEditing ? (
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-3xl font-bold text-neutral-800 mb-2 border-b-2 border-primary focus:outline-none"
              />
            ) : (
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-1">{userName}</h1>
            )}
            {isEditing ? (
               <input 
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="text-lg text-neutral-600 mb-4 border-b border-neutral-400 focus:outline-none"
              />
            ) : (
              <p className="text-lg text-neutral-600 mb-3 flex items-center justify-center md:justify-start">
                <EnvelopeIcon className="w-5 h-5 mr-2 text-neutral-500" /> {userEmail}
              </p>
            )}
             {user.isAdmin && <span className="bg-accent text-neutral-800 px-3 py-1 text-xs font-semibold rounded-full">Administrator</span>}
          </div>
          <div className="mt-4 md:mt-0">
            {isEditing ? (
              <div className="space-x-2">
                <Button onClick={handleSave} variant="primary" size="sm">Save</Button>
                <Button onClick={() => { setIsEditing(false); setUserName(user.name || ''); setUserEmail(user.email || ''); }} variant="ghost" size="sm">Cancel</Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">Edit Profile</Button>
            )}
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-neutral-700 mb-6 flex items-center">
            <AcademicCapIcon className="w-7 h-7 mr-3 text-secondary" /> My Enrolled Courses
          </h2>
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course: EnrolledCourse) => (
                <Card key={course.id} title={course.title} imageUrl={course.imageUrl} className="flex flex-col">
                  <p className="text-sm text-neutral-500 mb-2">{course.category}</p>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
                    <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-neutral-500 mb-4">{course.progress}% complete</p>
                  <div className="mt-auto">
                    <Button variant="primary" size="sm" asChild fullWidth>
                      <Link href={`/academy/learn/${course.id}`}>
                        {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">You are not enrolled in any courses yet. <Link href="/academy" className="text-primary hover:underline">Browse courses</Link>.</p>
          )}
        </section>

        {/* Certificates Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-neutral-700 mb-6 flex items-center">
            <AwardIcon className="w-7 h-7 mr-3 text-accent" /> My Certificates
          </h2>
          {issuedCertificates.filter(cert => cert.userId === user.id).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {issuedCertificates.filter(cert => cert.userId === user.id).map((certificate: Certificate) => (
                <Card key={certificate.id} className="bg-gradient-to-r from-primary/5 via-transparent to-transparent">
                    <div className="flex items-center mb-3">
                        <CheckCircleIcon className="w-8 h-8 text-success mr-3" />
                        <div>
                            <h3 className="font-semibold text-lg text-primary">{certificate.courseTitle}</h3>
                            <p className="text-xs text-neutral-500">Issued on: {new Date(certificate.issueDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className="text-sm text-neutral-600 mb-1">Verification Code: <code className="text-xs bg-neutral-100 p-1 rounded">{certificate.verificationCode}</code></p>
                    <div className="mt-4">
                        <Button variant="outline" size="sm" onClick={() => alert(`Downloading certificate for ${certificate.courseTitle} (mock)`)}>
                            Download Certificate (PDF)
                        </Button>
                    </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">You have not earned any certificates yet. Complete courses to earn them!</p>
          )}
        </section>
        
        <div className="mt-10 text-center">
            <Button variant="danger" onClick={logout}>Log Out</Button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRouteClient>
      <ProfilePageContent />
    </ProtectedRouteClient>
  );
}
