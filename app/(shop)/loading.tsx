export default function Loading() {
  return (
    <main className="animate-pulse">

      {/* Hero */}

      <section className="h-162.5 bg-gray-200" />

      {/* Categories */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10 h-10 w-72 rounded bg-gray-200" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-52 rounded-3xl bg-gray-200"
            />
          ))}

        </div>

      </section>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10 h-10 w-80 rounded bg-gray-200" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl border bg-white"
            >

              <div className="h-72 bg-gray-200" />

              <div className="space-y-4 p-6">

                <div className="h-4 w-20 rounded bg-gray-200" />

                <div className="h-6 rounded bg-gray-200" />

                <div className="h-4 w-24 rounded bg-gray-200" />

                <div className="h-8 w-32 rounded bg-gray-200" />

                <div className="h-12 rounded-xl bg-gray-200" />

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="bg-slate-900 py-24">

        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

          <div className="space-y-6">

            <div className="h-10 w-60 rounded bg-slate-700" />

            <div className="h-6 rounded bg-slate-700" />

            <div className="h-6 w-11/12 rounded bg-slate-700" />

            <div className="h-6 w-10/12 rounded bg-slate-700" />

          </div>

          <div className="h-125 rounded-3xl bg-slate-700" />

        </div>

      </section>

    </main>
  );
}