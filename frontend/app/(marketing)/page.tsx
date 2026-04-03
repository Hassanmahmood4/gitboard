import { FinalCtaSection } from "@/components/FinalCtaSection";
import { HeroSection } from "@/components/HeroSection";
import { InteractiveFeaturesSection } from "@/components/InteractiveFeaturesSection";
import { LogoMarquee } from "@/components/LogoMarquee";
import { PricingSection } from "@/components/PricingSection";
import { ProductShowcase } from "@/components/ProductShowcase";

export default function HomePage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <HeroSection />
      <LogoMarquee />
      <ProductShowcase />
      <InteractiveFeaturesSection />
      <div id="docs" className="scroll-mt-28" tabIndex={-1} />
      <PricingSection />
      <FinalCtaSection />
    </main>
  );
}
