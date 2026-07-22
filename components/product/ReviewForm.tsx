"use client";

import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createReview } from "@/actions/reviews/create-review";

import { Star } from "lucide-react";

const ReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating.")
    .max(5),

  title: z
    .string()
    .max(150, "Title is too long.")
    .optional(),

  comment: z
    .string()
    .min(10, "Please enter at least 10 characters.")
    .max(2000, "Comment is too long."),
});

type ReviewFormValues = z.infer<
  typeof ReviewSchema
>;

interface ReviewFormProps {
  productId: string;

  onSuccess?: () => void;
}

export default function ReviewForm({
  productId,
  onSuccess,
}: ReviewFormProps) {

  const [hoveredStar, setHoveredStar] =
    useState(0);

  const [isPending, startTransition] =
    useTransition();

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewSchema),

    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
  });

  const rating = form.watch("rating");

  const onSubmit = (
    values: ReviewFormValues
  ) => {

    setSuccess("");

    setError("");

    startTransition(async () => {

      const response =
        await createReview({
          ...values,
          productId,
        });

      if (!response.success) {

        setError(
          response.error ??
            "Something went wrong."
        );

        return;
      }

      setSuccess(
        response.message ??
          "Review submitted successfully."
      );

      form.reset({
        rating: 0,
        title: "",
        comment: "",
      });

      onSuccess?.();

    });

  };

  return (

    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="text-3xl font-bold text-[#0F172A]">

        Write a Review

      </h2>

      <p className="mt-3 text-gray-500">

        Tell other customers about your
        experience with this product.

      </p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 space-y-8"
      >

                {/* Rating */}

        <div>

          <label className="mb-3 block text-sm font-semibold text-[#0F172A]">

            Rating *

          </label>

          <div className="flex items-center gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                type="button"
                onMouseEnter={() =>
                  setHoveredStar(star)
                }
                onMouseLeave={() =>
                  setHoveredStar(0)
                }
                onClick={() =>
                  form.setValue(
                    "rating",
                    star,
                    {
                      shouldValidate: true,
                    }
                  )
                }
                className="transition-transform hover:scale-110"
              >

                <Star
                  size={32}
                  className={
                    star <=
                    (hoveredStar || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />

              </button>

            ))}

          </div>

          {form.formState.errors.rating && (

            <p className="mt-2 text-sm text-red-600">

              {
                form.formState.errors.rating
                  .message
              }

            </p>

          )}

        </div>

        {/* Review Title */}

        <div>

          <label
            htmlFor="title"
            className="mb-3 block text-sm font-semibold text-[#0F172A]"
          >

            Review Title

          </label>

          <input
            id="title"
            type="text"
            placeholder="Summarize your experience"
            {...form.register("title")}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-5
              py-4
              outline-none
              transition
              focus:border-[#DC2626]
              focus:ring-2
              focus:ring-red-100
            "
          />

          {form.formState.errors.title && (

            <p className="mt-2 text-sm text-red-600">

              {
                form.formState.errors.title
                  .message
              }

            </p>

          )}

        </div>
                {/* Review Comment */}

        <div>

          <label
            htmlFor="comment"
            className="mb-3 block text-sm font-semibold text-[#0F172A]"
          >

            Your Review *

          </label>

          <textarea
            id="comment"
            rows={6}
            placeholder="Tell other customers about your experience with this product..."
            {...form.register("comment")}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-5
              py-4
              outline-none
              transition
              focus:border-[#DC2626]
              focus:ring-2
              focus:ring-red-100
              resize-none
            "
          />

          {form.formState.errors.comment && (

            <p className="mt-2 text-sm text-red-600">

              {
                form.formState.errors.comment
                  .message
              }

            </p>

          )}

        </div>

        {/* Success Message */}

        {success && (

          <div
            className="
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-5
              py-4
              text-green-700
            "
          >

            {success}

          </div>

        )}

        {/* Error Message */}

        {error && (

          <div
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-red-700
            "
          >

            {error}

          </div>

        )}

        {/* Submit Button */}

        <button
          type="submit"
          disabled={isPending}
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-[#DC2626]
            px-6
            py-4
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-red-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          {isPending
            ? "Submitting Review..."
            : "Submit Review"}

        </button>
              </form>

    </div>

  );
}