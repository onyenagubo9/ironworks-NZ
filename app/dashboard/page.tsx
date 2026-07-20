import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Customer Dashboard
      </h1>

      <p className="mt-4">
        Welcome, {session.user.name}
      </p>

      <p className="mt-2">
        Role: {session.user.role}
      </p>
    </div>
  );
}