import { redirect } from "next/navigation";

import { auth } from "@/auth";

import AdminLayout from "@/components/admin/layout/AdminLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // User is not logged in
  if (!session) {
    redirect("/login");
  }

  // User is not an admin
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}