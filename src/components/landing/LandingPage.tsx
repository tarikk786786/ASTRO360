import React from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import TrustSection from './TrustSection';
import BirthChartSection from './BirthChartSection';
import FeatureGridSection from './FeatureGridSection';
import ChartExplorationSection from './ChartExplorationSection';
import HowItWorksSection from './HowItWorksSection';
import AIAstrologySection from './AIAstrologySection';
import DailyHoroscopeSection from './DailyHoroscopeSection';
import CompatibilitySection from './CompatibilitySection';
import ZodiacGridSection from './ZodiacGridSection';
import TestimonialsSection from './TestimonialsSection';
import AstrologerSection from './AstrologerSection';
import PricingSection from './PricingSection';
import FAQSection from './FAQSection';
import FinalCTASection from './FinalCTASection';
import LandingFooter from './LandingFooter';
import { UserProfile } from '../../types';

interface LandingPageProps {
  onStartOnboarding: (presetData?: Partial<UserProfile>) => void;
  onNavigateToTab: (tabId: string) => void;
  userProfile?: UserProfile;
}

export default function LandingPage({
  onStartOnboarding,
  onNavigateToTab,
  userProfile,
}: LandingPageProps) {
  const hasProfile = Boolean(userProfile?.name && userProfile?.dob);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    scrollToSection('birth-chart-section');
  };

  const handleBirthChartGenerated = (details: {
    name: string;
    dob: string;
    time: string;
    location: string;
  }) => {
    onStartOnboarding({
      name: details.name,
      dob: details.dob,
      time: details.time,
      location: details.location,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#070A12] text-slate-100 font-sans selection:bg-[#C9A86A]/30 selection:text-white">
      
      {/* 1. Glass Navigation */}
      <LandingNavbar
        onGetStarted={handleGetStarted}
        onNavigateSection={scrollToSection}
        onOpenDashboard={() => onNavigateToTab('dashboard')}
        hasProfile={hasProfile}
      />

      {/* 2. Hero Section with Live Rotating Birth Chart Wheel */}
      <HeroSection
        onGetStarted={handleGetStarted}
        onExploreHoroscope={() => scrollToSection('horoscope-section')}
      />

      {/* 3. Authentic Trust Section */}
      <TrustSection />

      {/* 4. Instant Interactive Birth Chart Generator */}
      <BirthChartSection onExploreFullReading={handleBirthChartGenerated} />

      {/* 5. 8-Core Astrology Feature Suite Grid */}
      <FeatureGridSection onSelectFeature={(tab) => onNavigateToTab(tab)} />

      {/* 6. Signature Interactive "What Does Your Chart Say?" */}
      <ChartExplorationSection onReadFullChart={() => onNavigateToTab('birth-chart')} />

      {/* 7. 3-Step "How It Works" Timeline */}
      <HowItWorksSection onStartStep={handleGetStarted} />

      {/* 8. AI Astrology Companion Section */}
      <AIAstrologySection onOpenChat={() => onNavigateToTab('chat')} />

      {/* 9. Interactive 12-Sign Daily Horoscope Ingress */}
      <DailyHoroscopeSection onReadFullHoroscope={() => onNavigateToTab('horoscope')} />

      {/* 10. Ashta Koota Relationship Compatibility Matcher */}
      <CompatibilitySection onCheckDeepCompatibility={() => onNavigateToTab('synastry')} />

      {/* 11. 12 Zodiac Archetype Cards */}
      <ZodiacGridSection onSelectSign={() => scrollToSection('horoscope-section')} />

      {/* 12. Grounded Member Testimonials */}
      <TestimonialsSection />

      {/* 13. Verified 1-on-1 Astrologer Consultations */}
      <AstrologerSection onBookAstrologer={() => onNavigateToTab('consultation-hub')} />

      {/* 14. Transparent Pricing Plans */}
      <PricingSection
        onSelectPlan={(plan) => {
          if (plan === 'consultation') {
            onNavigateToTab('consultation-hub');
          } else {
            handleGetStarted();
          }
        }}
      />

      {/* 15. Honest & Accessible FAQ Accordion */}
      <FAQSection />

      {/* 16. Final High-Impact Emotional CTA */}
      <FinalCTASection
        onCreateChart={handleGetStarted}
        onExploreHoroscope={() => scrollToSection('horoscope-section')}
      />

      {/* 17. Brand & Legal Footer */}
      <LandingFooter onNavigateTab={(tab) => onNavigateToTab(tab)} />
    </div>
  );
}
