import Skeleton from "@/components/ui/Skeleton";

export default function TableSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton
          key={index}
          className="mb-4 h-12 w-full"
        />
      ))}
    </div>
  );
}