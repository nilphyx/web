import Link from 'next/link';
import { Button } from '@/components/Button';
import { MagnifyingGlassIcon } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <MagnifyingGlassIcon className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-5xl font-bold text-neutral-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-neutral-700 mb-6">Page Not Found</h2>
      <p className="text-neutral-600 mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button variant="primary" size="lg" asChild>
        <Link href="/">Go back to Homepage</Link>
      </Button>
    </div>
  );
}
