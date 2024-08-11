import { FeatureSection } from '@/components/core/FeatureSection';
import { Hero } from '@/components/core/Hero';
import { PricingSection } from '@/components/core/PricingSections';
import { features } from '@/core/features';
import { plans } from '@/core/plans';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureSection features={features} />
      <PricingSection plans={plans} />
    </main>
  );
}
