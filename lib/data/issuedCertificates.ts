import { Certificate } from '@/lib/types';

// This file can serve as a template or for initial mock data.
// In a real application, this data would be dynamically generated and stored,
// likely managed by the useAuth hook or a backend system.

export const mockIssuedCertificates: Certificate[] = [
  {
    id: 'cert-ai-user1-course1',
    userId: 'user123', // Example user ID
    courseId: 'intro-to-ai',
    courseTitle: 'Introduction to Artificial Intelligence',
    userName: 'Alice Wonderland',
    issueDate: '2023-10-26T10:00:00Z',
    verificationCode: 'VERIFY-AI-ALICE-X1Y2Z3',
  },
  {
    id: 'cert-ml-user2-course2',
    userId: 'user456', // Example user ID
    courseId: 'machine-learning-basics',
    courseTitle: 'Machine Learning for Beginners',
    userName: 'Bob The Builder',
    issueDate: '2023-11-15T14:30:00Z',
    verificationCode: 'VERIFY-ML-BOB-A4B5C6',
  },
];
