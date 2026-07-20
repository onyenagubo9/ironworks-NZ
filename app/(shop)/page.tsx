import Hero from "@/components/frontend/home/Hero";
import FeaturedCategories from "@/components/frontend/home/FeaturedCategories";
import FeaturedProducts from "@/components/frontend/home/FeaturedProducts";
import BestSellers from "@/components/frontend/home/BestSellers";
import NewArrivals from "@/components/frontend/home/NewArrivals";
import Brands from "@/components/frontend/home/Brands";
import WhyChooseUs from "@/components/frontend/home/WhyChooseUs";
import Newsletter from "@/components/frontend/home/Newsletter";

export default async function HomePage() {
  return (
    <main className="space-y-24 pb-24">
      <Hero />

      <FeaturedCategories />

      <FeaturedProducts />

      <BestSellers />

      <NewArrivals />

      <Brands />

      <WhyChooseUs />

      <Newsletter />
    </main>
  );
}