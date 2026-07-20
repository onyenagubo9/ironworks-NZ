"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { login } from "@/actions/auth/login";

import {
  LoginInput,
  LoginSchema,
} from "@/schemas/login-schema";

export default function LoginForm() {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginInput>({
    resolver: zodResolver(
      LoginSchema
    ),
  });

  function onSubmit(
    values: LoginInput
  ) {
    setError("");

    startTransition(async () => {
      const result =
        await login(values);

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.success) {
        router.push(
          result.redirectTo
        );

        router.refresh();
      }
    });
  }

  return (

    <div className="w-full max-w-lg">

      <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-2xl">

        {/* Logo */}

        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#DC2626] text-white shadow-lg">

            <ShieldCheck size={38} />

          </div>

        </div>

        {/* Header */}

        <div className="mt-8 text-center">

          <h1 className="text-4xl font-bold text-[#0F172A]">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-600">
            Sign in to access your
            account, orders and
            checkout history.
          </p>

        </div>

        {/* Login Form */}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="mt-10 space-y-6"
        >
                    {/* Email */}

          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  pl-12
                  pr-4
                  outline-none
                  transition
                  focus:border-[#DC2626]
                  focus:ring-2
                  focus:ring-red-100
                "
              />

            </div>

            {errors.email && (

              <p className="mt-2 text-sm font-medium text-red-600">

                {errors.email.message}

              </p>

            )}

          </div>

          {/* Password */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <label className="font-medium text-gray-700">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#DC2626] transition hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                {...register("password")}
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  pl-12
                  pr-14
                  outline-none
                  transition
                  focus:border-[#DC2626]
                  focus:ring-2
                  focus:ring-red-100
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#DC2626]"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {errors.password && (

              <p className="mt-2 text-sm font-medium text-red-600">

                {errors.password.message}

              </p>

            )}

          </div>
                    {/* Remember Me */}

          <div className="flex items-center justify-between">

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-[#DC2626]"
              />

              <span className="text-sm text-gray-600">
                Remember me
              </span>

            </label>

            <span className="text-sm text-gray-500">
              Secure Login
            </span>

          </div>

          {/* Login Error */}

          {error && (

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">

              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">

                  <Lock
                    size={16}
                    className="text-red-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-red-700">
                    Login Failed
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* Submit Button */}

          <button
            type="submit"
            disabled={isPending}
            className="
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-xl
              bg-[#DC2626]
              text-lg
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-red-700
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {isPending ? (

              <div className="flex items-center gap-3">

                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >

                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />

                </svg>

                Signing In...

              </div>

            ) : (

              "Sign In"

            )}

          </button>

                    {/* Divider */}

          <div className="relative">

            <div className="absolute inset-0 flex items-center">

              <div className="w-full border-t border-gray-200" />

            </div>

            <div className="relative flex justify-center">

              <span className="bg-white px-4 text-sm text-gray-500">
                New to our store?
              </span>

            </div>

          </div>

          {/* Register */}

          <Link
            href="/register"
            className="
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-xl
              border-2
              border-[#DC2626]
              font-semibold
              text-[#DC2626]
              transition
              hover:bg-red-50
            "
          >
            Create an Account
          </Link>

          {/* Continue Shopping */}

          <Link
            href="/shop"
            className="
              block
              text-center
              text-sm
              font-medium
              text-gray-600
              transition
              hover:text-[#DC2626]
            "
          >
            ← Continue Shopping
          </Link>

          {/* Security Notice */}

          <div className="rounded-2xl bg-gray-50 p-5">

            <div className="flex items-start gap-3">

              <ShieldCheck
                size={22}
                className="mt-1 text-green-600"
              />

              <div>

                <h3 className="font-semibold text-[#0F172A]">
                  Secure Login
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Your account is protected using
                  encrypted authentication. Your
                  personal information and order
                  history remain secure every time
                  you sign in.
                </p>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>

  );
}