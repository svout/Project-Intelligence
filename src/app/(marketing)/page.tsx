'use client';

import Navbar from '@/components/widgets/marketing/Navbar';
import Hero from '@/components/widgets/marketing/Hero';
import ProductOverview from '@/components/widgets/marketing/ProductOverview';
import IntroSection from '@/components/widgets/marketing/IntroSection';
import FeaturesSlider from '@/components/widgets/marketing/FeaturesSlider';
import Problem from '@/components/widgets/marketing/Problem';
import Solution from '@/components/widgets/marketing/Solution';
import HowItWorks from '@/components/widgets/marketing/HowItWorks';
import KeyFeatures from '@/components/widgets/marketing/KeyFeatures';
import Features from '@/components/widgets/marketing/Features';
import DashboardPreview from '@/components/widgets/marketing/DashboardPreview';
import Integrations from '@/components/widgets/marketing/Integrations';
import Testimonials from '@/components/widgets/marketing/Testimonials';
import CTA from '@/components/widgets/marketing/CTA';
import Footer from '@/components/widgets/marketing/Footer';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main className="relative mx-auto py-12 flex flex-col gap-12">
        <Hero />
        <ProductOverview />
        <IntroSection />
        <FeaturesSlider />
        <Problem />
        <Solution />
        <HowItWorks />
        <KeyFeatures />
        <Features />
        <DashboardPreview />
        <Integrations />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
