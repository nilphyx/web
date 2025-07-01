"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Loader2 } from "lucide-react"; 

type Props = {
  courseId: string;
};

export function ViewCourseButton({ courseId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClicked(true);
    startTransition(() => {
      router.push(`/academy/${courseId}`);
    });
  };

  return (
    <Button variant="primary" fullWidth asChild disabled={isPending || clicked}>
      <Link href={`/academy/${courseId}`} onClick={handleClick}>
        {isPending || clicked ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </span>
        ) : (
          "View Details"
        )}
      </Link>
    </Button>
  );
}
