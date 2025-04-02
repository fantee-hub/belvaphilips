import BrandsStrip from "@/components/home/Brands";
import HeroSection from "@/components/home/HeroSection";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import PricingSection from "@/components/home/PricingSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import USPSection from "@/components/home/USPSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-[100px]">
      <HeroSection />
      <BrandsStrip />
      <PricingSection />
      <PortfolioShowcase />
      <USPSection />
      <TestimonialsSection />
      <ProcessSection />
    </div>
  );
}
