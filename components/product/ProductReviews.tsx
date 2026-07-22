"use client";

import { Star, BadgeCheck } from "lucide-react";

type ReviewUser = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
};

type ProductReview = {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  verifiedPurchase: boolean;
  createdAt: Date;
  user: ReviewUser;
};

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export default function ProductReviews({
  reviews,
}: ProductReviewsProps) {
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : reviews.reduce(
          (total, review) => total + review.rating,
          0
        ) / totalReviews;

  const roundedRating =
    Math.round(averageRating * 10) / 10;

  return (
    <section className="mt-24">

      <div className="rounded-3xl bg-white p-8 shadow-lg">

        {/* Header */}

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-3xl font-bold text-[#0F172A]">

              Customer Reviews

            </h2>

            <p className="mt-2 text-gray-500">

              Read genuine feedback from customers who
              purchased this product.

            </p>

          </div>

          <div className="rounded-2xl bg-gray-50 p-6">

            <div className="flex items-center gap-4">

              <span className="text-5xl font-bold text-[#0F172A]">

                {roundedRating.toFixed(1)}

              </span>

              <div>

                <div className="flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}

                </div>

                <p className="mt-2 text-sm text-gray-500">

                  Based on {totalReviews} review
                  {totalReviews !== 1 && "s"}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Reviews */}

        <div className="mt-12 space-y-8">

                      {reviews.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">

              <Star
                size={60}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-6 text-2xl font-bold text-[#0F172A]">

                No Reviews Yet

              </h3>

              <p className="mt-3 text-gray-500">

                Be the first customer to review this product.

              </p>

            </div>

          ) : (

            reviews.map((review) => (

              <div
                key={review.id}
                className="rounded-2xl border border-gray-200 p-8"
              >

                {/* Review Header */}

                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                  <div className="flex items-start gap-4">

                    {/* Avatar */}

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-[#DC2626]
                        text-lg
                        font-bold
                        text-white
                      "
                    >

                      {review.user.firstName.charAt(0)}
                      {review.user.lastName.charAt(0)}

                    </div>

                    <div>

                      <h3 className="text-lg font-semibold text-[#0F172A]">

                        {review.user.firstName}{" "}
                        {review.user.lastName}

                      </h3>

                      {review.verifiedPurchase && (

                        <div className="mt-2 flex items-center gap-2 text-green-600">

                          <BadgeCheck size={18} />

                          <span className="text-sm font-medium">

                            Verified Purchase

                          </span>

                        </div>

                      )}

                    </div>

                  </div>

                  <div className="text-left md:text-right">

                    <div className="flex justify-start gap-1 md:justify-end">

                      {[1, 2, 3, 4, 5].map((star) => (

                        <Star
                          key={star}
                          size={18}
                          className={
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />

                      ))}

                    </div>

                    <p className="mt-2 text-sm text-gray-500">

                      {new Date(
                        review.createdAt
                      ).toLocaleDateString("en-NZ", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}

                    </p>

                  </div>

                </div>

                {/* Review Content */}

                <div className="mt-8">

                  {review.title && (

                    <h4 className="text-xl font-bold text-[#0F172A]">

                      {review.title}

                    </h4>

                  )}

                  {review.comment && (

                    <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">

                      {review.comment}

                    </p>

                  )}

                </div>

              </div>

            ))

          )}
                  </div>

        {/* Rating Breakdown */}

        {totalReviews > 0 && (

          <div className="mt-16 border-t border-gray-200 pt-10">

            <h3 className="text-2xl font-bold text-[#0F172A]">

              Rating Breakdown

            </h3>

            <div className="mt-8 space-y-5">

              {[5, 4, 3, 2, 1].map((rating) => {

                const count = reviews.filter(
                  (review) => review.rating === rating
                ).length;

                const percentage =
                  totalReviews === 0
                    ? 0
                    : (count / totalReviews) * 100;

                return (

                  <div
                    key={rating}
                    className="flex items-center gap-4"
                  >

                    <div className="flex w-20 items-center gap-1">

                      <span className="font-medium">

                        {rating}

                      </span>

                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />

                    </div>

                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">

                      <div
                        className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    <div className="w-16 text-right text-sm font-medium text-gray-600">

                      {count}

                    </div>

                  </div>

                );

              })}

            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl bg-gray-50 p-6 text-center">

                <p className="text-sm uppercase tracking-wide text-gray-500">

                  Average Rating

                </p>

                <p className="mt-3 text-4xl font-bold text-[#0F172A]">

                  {roundedRating.toFixed(1)}

                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 p-6 text-center">

                <p className="text-sm uppercase tracking-wide text-gray-500">

                  Total Reviews

                </p>

                <p className="mt-3 text-4xl font-bold text-[#0F172A]">

                  {totalReviews}

                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 p-6 text-center">

                <p className="text-sm uppercase tracking-wide text-gray-500">

                  Recommendation

                </p>

                <p className="mt-3 text-4xl font-bold text-green-600">

                  {totalReviews === 0
                    ? "0%"
                    : `${Math.round(
                        (reviews.filter(
                          (review) =>
                            review.rating >= 4
                        ).length /
                          totalReviews) *
                          100
                      )}%`}

                </p>

              </div>

            </div>

          </div>

        )}

                {/* Review CTA */}

        <div className="mt-16 rounded-3xl bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] p-10 text-center">

          <h3 className="text-3xl font-bold text-white">

            Share Your Experience

          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">

            Have you purchased this product? We'd love to hear
            your thoughts. Your review helps other customers
            make informed decisions.

          </p>

          <button
            className="
              mt-8
              rounded-xl
              bg-[#DC2626]
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition
              hover:bg-red-700
            "
          >

            Write a Review

          </button>

        </div>

      </div>

    </section>

  );
}