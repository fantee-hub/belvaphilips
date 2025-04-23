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
// import GetStartedCTA from "@/components/pricing/GetStartedCTA";
// import FAQSection from "@/components/pricing/FAQSection";

export default function PricingPage() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
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
      <div className="pt-[100px] bg-white" ref={ref}>
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
            {/* 
          <GetStartedCTA />
          
        
           */}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
