"use client";

import { useState, useTransition } from "react";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { register } from "@/actions/auth/register";

import {
  RegisterInput,
  RegisterSchema,
} from "@/schemas/register-schema";

export default function RegisterForm() {

  const [isPending, startTransition] =
    useTransition();

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(
      RegisterSchema
    ),
  });

  function onSubmit(
    values: RegisterInput
  ) {

    setError("");

    setSuccess("");

    startTransition(async () => {

      const result =
        await register(values);

      if (result?.error) {
        setError(result.error);
        return;
      }

      setSuccess(
        result.success ??
          "Your account has been created successfully."
      );

      reset();

    });

  }

  return (

    <div className="w-full max-w-xl">

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
            Create Account
          </h1>

          <p className="mt-3 text-gray-600">
            Join our store to place orders,
            manage your account, save your
            addresses and track deliveries.
          </p>

        </div>

        {/* Registration Form */}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="mt-10 space-y-6"
        >
                    {/* Name */}

          <div className="grid gap-6 md:grid-cols-2">

            {/* First Name */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                First Name
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  {...formRegister("firstName")}
                  type="text"
                  placeholder="First name"
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

              {errors.firstName && (

                <p className="mt-2 text-sm font-medium text-red-600">
                  {errors.firstName.message}
                </p>

              )}

            </div>

            {/* Last Name */}

            <div>

              <label className="mb-2 block font-medium text-gray-700">
                Last Name
              </label>

              <div className="relative">

                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  {...formRegister("lastName")}
                  type="text"
                  placeholder="Last name"
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

              {errors.lastName && (

                <p className="mt-2 text-sm font-medium text-red-600">
                  {errors.lastName.message}
                </p>

              )}

            </div>

          </div>

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
                {...formRegister("email")}
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

            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                {...formRegister("password")}
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a strong password"
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
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  transition
                  hover:text-[#DC2626]
                "
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

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                {...formRegister("confirmPassword")}
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
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
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  transition
                  hover:text-[#DC2626]
                "
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {errors.confirmPassword && (

              <p className="mt-2 text-sm font-medium text-red-600">
                {errors.confirmPassword.message}
              </p>

            )}

          </div>
                    {/* Error Message */}

          {error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">

                  <Lock
                    size={16}
                    className="text-red-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-red-700">
                    Registration Failed
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* Success Message */}

          {success && (

            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">

              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">

                  <ShieldCheck
                    size={16}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-green-700">
                    Account Created
                  </h3>

                  <p className="mt-1 text-sm text-green-600">
                    {success}
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* Password Tips */}

          <div className="rounded-2xl bg-gray-50 p-5">

            <h3 className="font-semibold text-[#0F172A]">
              Password Requirements
            </h3>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">

              <li>
                • At least 8 characters long
              </li>

              <li>
                • Include uppercase and lowercase letters
              </li>

              <li>
                • Include at least one number
              </li>

              <li>
                • Use a special character for stronger security
              </li>

            </ul>

          </div>

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
              gap-3
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

              <>

                <Loader2
                  size={20}
                  className="animate-spin"
                />

                Creating Account...

              </>

            ) : (

              "Create Account"

            )}

          </button>
                    {/* Divider */}

          <div className="relative">

            <div className="absolute inset-0 flex items-center">

              <div className="w-full border-t border-gray-200" />

            </div>

            <div className="relative flex justify-center">

              <span className="bg-white px-4 text-sm text-gray-500">
                Already have an account?
              </span>

            </div>

          </div>

          {/* Login */}

          <Link
            href="/login"
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
            Sign In
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
                  Your Information is Secure
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  We use encrypted authentication
                  and secure password storage to
                  protect your account. Your personal
                  information is never shared with
                  third parties without your consent.
                </p>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>

  );
}