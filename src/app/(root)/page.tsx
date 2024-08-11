import { FeatureSection } from '@/components/site/FeatureSection';
import { Hero } from '@/components/site/Hero';
import { PricingSection } from '@/components/site/PricingSections';
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
