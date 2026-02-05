import HeroSection from "@/sections/HeroSection";
import FeaturesSection from "@/sections/FeaturesSection";
// import LeaderboardSection from "@/sections/LeaderboardSection";
import FAQSection from "@/sections/FAQSection";
import CTASection from "@/sections/CTASection";
import FooterSection from "@/sections/FooterSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <HeroSection />
      <FeaturesSection />
      {/* <LeaderboardSection /> */}
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
