import Skeleton from "@/components/ui/Skeleton";

export default function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <Skeleton className="mb-6 h-12 w-12 rounded-full" />

      <Skeleton className="mb-4 h-5 w-28" />

      <Skeleton className="h-10 w-36" />
    </div>
  );
}