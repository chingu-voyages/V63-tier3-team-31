import HeroSection from "@/features/home-page/components/HeroSection";
import FeaturesSection from "@/features/home-page/components/FeaturesSection";
import HowItWorksSection from "@/features/home-page/components/HowItWorksSection";
import AccountSection from "@/features/home-page/components/AccountSection";
import FAQSection from "@/features/home-page/components/FAQSection";
import CTASection from "@/features/home-page/components/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AccountSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}