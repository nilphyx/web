'use client';

import React from 'react';
import AdminRouteClient from '@/components/AdminRouteClient';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { BarChartIcon, UsersIcon, BookOpenIcon, CpuChipIcon, SettingsIcon } from '@/components/icons';
// import { useAuth } from '@/lib/hooks/useAuth'; // For admin user info

const AdminDashboardContent: React.FC = () => {
  // const { user } = useAuth(); // To display admin name or for further checks

  // Mock data for dashboard stats
  const stats = [
    { name: 'Total Users', value: '1,234', icon: <UsersIcon className="w-8 h-8 text-primary" />, link: '/admin/users' },
    { name: 'Active Courses', value: '56', icon: <BookOpenIcon className="w-8 h-8 text-secondary" />, link: '/admin/courses' },
    { name: 'Datasets', value: '102', icon: <CpuChipIcon className="w-8 h-8 text-accent" />, link: '/admin/datasets' },
    { name: 'Pending Approvals', value: '7', icon: <SettingsIcon className="w-8 h-8 text-danger" />, link: '/admin/approvals' },
  ];

  const quickActions = [
    { name: 'Manage Users', href: '/admin/manage-users', description: "View, edit, or suspend user accounts." },
    { name: 'Manage Courses', href: '/admin/manage-courses', description: "Add, edit, or remove courses from the academy." },
    { name: 'Content Moderation', href: '/admin/moderation', description: "Review and moderate user-generated content." },
    { name: 'System Settings', href: '/admin/settings', description: "Configure platform-wide settings and integrations." },
  ];


  return (
    <div className="container mx-auto py-8 px-4 animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800">Admin Dashboard</h1>
        <p className="text-neutral-600">Welcome, Administrator! Manage and monitor the platform here.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <Card key={stat.name} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="mx-auto mb-3">{stat.icon}</div>
            <p className="text-3xl font-semibold text-neutral-800">{stat.value}</p>
            <p className="text-neutral-500 text-sm">{stat.name}</p>
            {/* <Button variant="ghost" size="sm" asChild className="mt-3">
              <Link href={stat.link}>View</Link>
            </Button> */}
          </Card>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-neutral-700 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => (
                 <Card key={action.name} className="hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">{action.name}</h3>
                    <p className="text-sm text-neutral-600 mb-4">{action.description}</p>
                    <Button variant="outline" asChild>
                        <Link href={action.href}>Go to {action.name.split(' ')[1]}</Link>
                    </Button>
                 </Card>
            ))}
        </div>
      </div>


      {/* Placeholder for recent activity or reports */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-neutral-700 mb-4">Platform Analytics Overview</h2>
        <div className="flex items-center justify-center text-neutral-400 h-64 border-2 border-dashed border-neutral-300 rounded-md">
          <BarChartIcon className="w-12 h-12 mr-2" />
          <p>Analytics and reporting charts will be displayed here.</p>
        </div>
        <p className="text-xs text-neutral-500 mt-2 text-center"> (Data and charts are for illustrative purposes and will be implemented later)</p>
      </div>
    </div>
  );
};

export default function AdminDashboardPage() {
  return (
    <AdminRouteClient>
      <AdminDashboardContent />
    </AdminRouteClient>
  );
}