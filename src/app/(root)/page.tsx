import { FeatureSection } from '@/components/core/FeatureSection';
import { Hero } from '@/components/core/Hero';
import { PricingSection } from '@/components/core/PricingSections';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureSection />
      <PricingSection />
    </main>
  );
}
