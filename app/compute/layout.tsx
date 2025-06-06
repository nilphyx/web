import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compute Resources - AI Platform',
  description: 'Access powerful compute resources for your AI model training and inference needs.',
};

export default function ComputeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 