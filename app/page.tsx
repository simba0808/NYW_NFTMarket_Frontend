import HeroSection from "@/lib/components/landing/HeroSection";
import ShowcaseSection from "@/lib/components/landing/ShowcaseSection";
import CompanySection from "@/lib/components/landing/CompanySection";
import CampaignSection from "@/lib/components/landing/CampaignSection";
import HighlightSection from "@/lib/components/landing/HighlightSection";
import RoadmapSection from "@/lib/components/landing/RoadmapSection";
import FeedbackSection from "@/lib/components/landing/FeedbackSection";

export default function Home() {
  return (
    <section className="text-white">
      <HeroSection />
      <ShowcaseSection />
      <CompanySection />
      <CampaignSection />
      <HighlightSection />
      <RoadmapSection />
      <FeedbackSection />
    </section>
  );
}
