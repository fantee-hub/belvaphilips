"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import PricingHeader from "@/components/pricing/PricingHeader";
import FixedPricingSection from "@/components/pricing/FixedPricingSection";
import ProductVideosSection from "@/components/pricing/ProductVideosSection";
import FAQSection from "@/components/home/FAQSection";
import MembershipsSection from "@/components/pricing/MembershipsSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PricingPage() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      const timer = setTimeout(() => {
        controls.start("visible");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Header />
      <div className="md:pt-[100px] pt-9 bg-white" ref={ref}>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-20"
          >
            <PricingHeader />
            <FixedPricingSection />
            <ProductVideosSection />
            <MembershipsSection />
            <FAQSection />
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
