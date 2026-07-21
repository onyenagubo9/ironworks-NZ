import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Calendar,
  Edit,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      addresses: true,
      orders: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Customer Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#0F172A]">
            My Profile
          </h1>

          <p className="mt-3 text-gray-600">
            View and manage your personal account information.
          </p>

        </div>

        <Link
          href="/dashboard/profile/edit"
          className="inline-flex items-center gap-3 rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >

          <Edit size={20} />

          Edit Profile

        </Link>

      </div>

      {/* Hero Card */}

      <section className="rounded-3xl bg-linear-to-r from-[#DC2626] to-red-700 p-10 text-white shadow-xl">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

          {/* Avatar */}

          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white/20 text-5xl font-bold">

            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}

          </div>

          <div className="flex-1">

            <h2 className="text-4xl font-bold">

              {user.firstName} {user.lastName}

            </h2>

            <p className="mt-3 text-lg text-red-100">

              {user.email}

            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

                {user.role}

              </span>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

                {user.status}

              </span>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">

                {user.emailVerified
                  ? "Verified Email"
                  : "Email Not Verified"}

              </span>

            </div>

          </div>

        </div>

      </section>

            {/* Profile Information */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Column */}

        <div className="space-y-8 lg:col-span-2">

          {/* Personal Information */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-3">

              <User className="text-[#DC2626]" />

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Personal Information
              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  First Name
                </p>

                <p className="mt-2 text-lg font-semibold text-[#0F172A]">
                  {user.firstName}
                </p>

              </div>

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Last Name
                </p>

                <p className="mt-2 text-lg font-semibold text-[#0F172A]">
                  {user.lastName}
                </p>

              </div>

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Role
                </p>

                <p className="mt-2">

                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                    {user.role}

                  </span>

                </p>

              </div>

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Account Status
                </p>

                <p className="mt-2">

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {user.status}

                  </span>

                </p>

              </div>

            </div>

          </section>

          {/* Contact Information */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-3">

              <Mail className="text-[#DC2626]" />

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Contact Information
              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Email Address
                </p>

                <p className="mt-2 text-lg font-semibold text-[#0F172A]">
                  {user.email}
                </p>

              </div>

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Phone Number
                </p>

                <p className="mt-2 text-lg font-semibold text-[#0F172A]">

                  {user.phone || "Not Provided"}

                </p>

              </div>

            </div>

          </section>

                    {/* Account Information */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-3">

              <Calendar className="text-[#DC2626]" />

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Account Information
              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Member Since
                </p>

                <p className="mt-2 text-lg font-semibold text-[#0F172A]">

                  {new Date(user.createdAt).toLocaleDateString(
                    "en-NZ",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}

                </p>

              </div>

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Last Updated
                </p>

                <p className="mt-2 text-lg font-semibold text-[#0F172A]">

                  {new Date(user.updatedAt).toLocaleDateString(
                    "en-NZ",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}

                </p>

              </div>

            </div>

          </section>

        </div>

        {/* Right Sidebar */}

        <div className="space-y-8">

          {/* Account Summary */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Account Summary
            </h2>

            <div className="mt-8 space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Orders
                </span>

                <span className="font-bold text-[#0F172A]">

                  {user.orders.length}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Saved Addresses
                </span>

                <span className="font-bold text-[#0F172A]">

                  {user.addresses.length}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Email Status
                </span>

                <span
                  className={`font-semibold ${
                    user.emailVerified
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >

                  {user.emailVerified
                    ? "Verified"
                    : "Not Verified"}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Account Status
                </span>

                <span
                  className={`font-semibold ${
                    user.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >

                  {user.status}

                </span>

              </div>

            </div>

          </section>

          {/* Security */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <ShieldCheck className="text-[#DC2626]" />

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Security
              </h2>

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Password
                </span>

                <span className="font-semibold">
                  Protected
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Email Verification
                </span>

                <span
                  className={`font-semibold ${
                    user.emailVerified
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >

                  {user.emailVerified
                    ? "Completed"
                    : "Pending"}

                </span>

              </div>

            </div>

            <Link
              href="/dashboard/security"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#DC2626] px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Manage Security
            </Link>

          </section>
                    {/* Default Address */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Default Address
            </h2>

            {user.addresses.length > 0 ? (

              <div className="mt-6 space-y-3">

                <p className="font-semibold text-[#0F172A]">
                  {user.addresses[0].fullName}
                </p>

                <p className="text-gray-600">
                  {user.addresses[0].street}
                </p>

                <p className="text-gray-600">

                  {user.addresses[0].city},{" "}
                  {user.addresses[0].state}

                </p>

                <p className="text-gray-600">
                  {user.addresses[0].country}
                </p>

                {user.addresses[0].postalCode && (

                  <p className="text-gray-600">

                    {user.addresses[0].postalCode}

                  </p>

                )}

                <p className="font-medium text-[#0F172A]">

                  {user.addresses[0].phone}

                </p>

              </div>

            ) : (

              <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center">

                <p className="text-gray-600">
                  You haven't added any address yet.
                </p>

                <Link
                  href="/dashboard/addresses"
                  className="mt-5 inline-flex rounded-xl bg-[#DC2626] px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Add Address
                </Link>

              </div>

            )}

          </section>

          {/* Profile Completion */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Profile Completion
            </h2>

            {(() => {

              const completion =
                [
                  user.firstName,
                  user.lastName,
                  user.email,
                  user.phone,
                  user.emailVerified,
                  user.addresses.length > 0,
                ].filter(Boolean).length;

              const percentage = Math.round(
                (completion / 6) * 100
              );

              return (

                <>

                  <div className="mt-8 flex items-center justify-between">

                    <span className="text-gray-600">
                      Completion
                    </span>

                    <span className="font-bold text-[#DC2626]">
                      {percentage}%
                    </span>

                  </div>

                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">

                    <div
                      className="h-full rounded-full bg-[#DC2626] transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                  <p className="mt-5 text-sm leading-6 text-gray-600">

                    Complete your profile to
                    enjoy a better shopping
                    experience and faster
                    checkout.

                  </p>

                </>

              );

            })()}

          </section>

          {/* Quick Actions */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Quick Actions
            </h2>

            <div className="mt-8 space-y-4">

              <Link
                href="/dashboard/profile/edit"
                className="flex items-center justify-center rounded-xl bg-[#DC2626] px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Edit Profile
              </Link>

              <Link
                href="/dashboard/security"
                className="flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100"
              >
                Change Password
              </Link>

              <Link
                href="/dashboard/addresses"
                className="flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100"
              >
                Manage Addresses
              </Link>

            </div>

          </section>

        </div>

      </div>

      {/* Bottom Banner */}

      <section className="rounded-3xl bg-linear-to-r from-[#DC2626] to-red-700 p-10 text-white shadow-xl">

        <h2 className="text-3xl font-bold">
          Keep Your Profile Updated
        </h2>

        <p className="mt-4 max-w-3xl text-red-100 leading-7">

          Keeping your personal information,
          contact details and delivery addresses
          up to date helps us process your
          orders faster and improves your
          shopping experience.

        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <Link
            href="/dashboard/profile/edit"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-[#DC2626] transition hover:bg-gray-100"
          >
            Update Profile
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#DC2626]"
          >
            Back to Dashboard
          </Link>

        </div>

      </section>

    </div>

  );

}