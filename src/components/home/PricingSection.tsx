"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const pricingOptions = [
  {
    title: "Basic End Finish",
    description: "From ₦25,000/image",
    image: "/assets/pricing/basic.png",
  },
  {
    title: "Medium End Finish",
    description: "From ₦44,000/image",
    image: "/assets/pricing/medium.png",
  },
  {
    title: "High End Finish",
    description: "From ₦65,000/image",
    image: "/assets/pricing/high.png",
  },
  {
    title: "Premium Finish",
    description: "From ₦150,000/image",
    image: "/assets/pricing/premium.png",
  },
];

const PricingSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full py-[60px] bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-11"
        >
          {/* Section Header */}
          <div className="max-w-3xl">
            <motion.h2
              variants={itemVariants}
              className="text-[64px] font-semibold mb-0 tracking-[-3px]"
            >
              PRICING MADE SIMPLE
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-[#444444] -mt-1"
            >
              Clear and Affordable Pricing
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row gap-[25px]">
            <motion.div
              variants={itemVariants}
              className="w-full md:w-2/3 border border-gray-200 p-7"
            >
              <h3 className="text-[28px] font-medium mb-3">
                PER-IMAGE FIXED PRICING
              </h3>
              <p className="text-[#787878] max-w-[537px] mb-8">
                We offer fixed per-image pricing based on your selected service
                tier, while also allowing for remote coordination.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pricingOptions.map((option, index) => (
                  <motion.div
                    key={option.title}
                    variants={itemVariants}
                    custom={index + 2}
                    className="flex flex-col"
                  >
                    <div className="relative h-[183px] max-w-[158px] w-full mb-3 overflow-hidden">
                      <Image
                        src={option.image}
                        alt={option.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h4 className="font-medium">{option.title}</h4>
                    <p className="text-[#787878] text-sm">
                      {option.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Membership */}
            <motion.div
              variants={itemVariants}
              className="w-full md:w-1/3 border border-gray-200 p-7"
            >
              <h3 className="text-[28px] font-medium mb-3">MEMBERSHIP</h3>
              <p className="text-[#787878] mb-8">
                For businesses and professionals needing frequent edits, we also
                provide membership plans.
              </p>

              <div className="h-[195px] w-full overflow-hidden relative">
                <div className="absolute top-0 inset-0 bg-gradient-to-br from-[#FEC845]  to-black"></div>

                <div className="absolute  flex flex-col justify-end py-0 px-6 pt-[11px] right-0 top-0 text-white">
                  <h4 className="text-[29.54px] font-black text-right">
                    Up to <span className="text-[34px]">25%</span>
                  </h4>
                  <p className="text-[29.54px] font-black mb-4 text-right">
                    per image savings!
                  </p>
                </div>
                <div className="flex justify-end absolute left-5 bottom-[23.5px]">
                  <Link
                    href="/membership"
                    className="inline-flex items-center text-white hover:underline"
                  >
                    Explore membership plans
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
