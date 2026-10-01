import { AboutPreview } from "@/features/home/components/AboutPreview";
import { FeaturedPrograms } from "@/features/home/components/FeaturedPrograms";
import { HomeCta } from "@/features/home/components/HomeCta";
import { HomeHero } from "@/features/home/components/HomeHero";
import { WhyChooseUs } from "@/features/home/components/WhyChooseUs";

export function HomePage() {
  return (
    <>
      <HomeHero />

      <AboutPreview />

      <WhyChooseUs />

      <FeaturedPrograms />

      <HomeCta />
    </>
  );
}