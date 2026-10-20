import { useCallback, useState } from 'react';
import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import FaqSection from '@/components/faq-section';
import IntroSection from '@/components/intro-section';
import LegalDialog from '@/components/legal-dialog';
import PhotographyHero from '@/components/photography-hero';
import PixelCursor from '@/components/pixel-cursor';
import ProcessSection from '@/components/process-section';
import ProjectModal from '@/components/project-modal';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import TestimonialsSection from '@/components/testimonials-section';
import TreatmentsSection from '@/components/treatments-section';
import Ticker from '@/components/ticker';
import WorkSection from '@/components/work-section';
import { SITE } from '@/data/site';

export default function App() {
  const [openProject, setOpenProject] = useState<number | null>(null);
  const closeProject = useCallback(() => setOpenProject(null), []);

  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* The hero stays pinned while the intro slides over it */}
        <div className="relative">
          <PhotographyHero lines={SITE.heroLines} nextSectionId="suite" />
          <IntroSection id="suite" />
        </div>

        <Ticker />
        <TreatmentsSection />
        <WorkSection onOpen={setOpenProject} />
        <ProcessSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>

      <SiteFooter />

      <ProjectModal index={openProject} onClose={closeProject} onNavigate={setOpenProject} />
      <LegalDialog />
      <PixelCursor />

      {/* Film grain over the whole site */}
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.07]" />
    </>
  );
}
