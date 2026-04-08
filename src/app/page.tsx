import HeroSlider from "@/components/home/HeroSlider";
import AboutPreview from "@/components/home/AboutPreview";
import ProgramsShowcase from "@/components/home/ProgramsShowcase";
import ImpactStats from "@/components/home/ImpactStats";
import TimelineSection from "@/components/home/TimelineSection";
import PartnersCarousel from "@/components/home/PartnersCarousel";
import DonationCTA from "@/components/home/DonationCTA";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutPreview />
      <ProgramsShowcase />
      <ImpactStats />
      <TimelineSection />
      <PartnersCarousel />
      <DonationCTA />
      <NewsletterSignup />
    </>
  );
}
