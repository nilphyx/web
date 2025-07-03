import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* <p className="ml-4 text-neutral-600">
        Preparing your learning experience...
      </p> */}
      <Spinner size="lg" />
    </div>
  );
}
