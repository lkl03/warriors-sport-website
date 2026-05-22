import HeroSection       from "@/components/sections/HeroSection";
import StatsSection      from "@/components/sections/StatsSection";
import AboutSection      from "@/components/sections/AboutSection";
import ScheduleSection   from "@/components/sections/ScheduleSection";
import SedesSection      from "@/components/sections/SedesSection";
import ReviewsSection    from "@/components/sections/ReviewsSection";
import CourseSection     from "@/components/sections/CourseSection";
import InstagramSection  from "@/components/sections/InstagramSection";
import FinalCTASection   from "@/components/sections/FinalCTASection";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

export default function Home() {
  return (
    <ScrollRevealProvider>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ScheduleSection />
      <SedesSection />
      <ReviewsSection />
      <CourseSection />
      <InstagramSection />
      <FinalCTASection />
    </ScrollRevealProvider>
  );
}
