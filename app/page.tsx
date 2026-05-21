import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import ClassesSection from "@/components/sections/ClassesSection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import PlansSection from "@/components/sections/PlansSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

export default function Home() {
  return (
    <ScrollRevealProvider>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ClassesSection />
      <ScheduleSection />
      <PlansSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
    </ScrollRevealProvider>
  );
}
