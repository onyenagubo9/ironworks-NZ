export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">

      <div className="h-10 w-72 rounded bg-gray-200" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            key={index}
            className="h-36 rounded-2xl bg-gray-200"
          />

        ))}

      </div>

      <div className="h-16 rounded-2xl bg-gray-200" />

      <div className="rounded-2xl bg-gray-200 h-125" />

    </div>
  );
}