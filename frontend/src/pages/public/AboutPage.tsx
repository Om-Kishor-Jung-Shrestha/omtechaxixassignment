import { AboutHero } from "@/features/about/components/AboutHero";
import { AboutStory } from "@/features/about/components/AboutStory";
import { AboutValues } from "@/features/about/components/AboutValues";
import { AboutCta } from "@/features/about/components/AboutCta";

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCta />
    </>
  );
}