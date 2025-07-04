'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h2 className="text-2xl font-semibold text-danger mb-4">Something went wrong!</h2>
      <p className="text-neutral-700 mb-6">{error.message || 'An unexpected error occurred.'}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        variant="primary"
      >
        Try again
      </Button>
    </div>
  );
}
