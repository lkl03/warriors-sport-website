import HeroSection       from "@/components/sections/HeroSection";
import StatsSection      from "@/components/sections/StatsSection";
import AboutSection      from "@/components/sections/AboutSection";
import ScheduleSection   from "@/components/sections/ScheduleSection";
import SedesSection      from "@/components/sections/SedesSection";
import ReviewsSection    from "@/components/sections/ReviewsSection";
import CourseSection     from "@/components/sections/CourseSection";
import InstagramSection  from "@/components/sections/InstagramSection";
import FinalCTASection   from "@/components/sections/FinalCTASection";
import FAQSection        from "@/components/sections/FAQSection";
import { homeGraph, jsonLdString } from "@/lib/schema";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

export default function Home() {
  return (
    <ScrollRevealProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(homeGraph) }}
      />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ScheduleSection />
      <SedesSection />
      <ReviewsSection />
      <CourseSection />
      <FAQSection />
      <InstagramSection />
      <FinalCTASection />
    </ScrollRevealProvider>
  );
}
