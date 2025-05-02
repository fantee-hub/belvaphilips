"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

import PortfolioItem from "./PortfolioItem";
import ViewAllCard from "./ViewAllCard";
import { portfolioItems } from "@/lib/mockData";

const PortfolioShowcase = () => {
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
    <section className="w-full pt-[25px] pb-[48px] bg-[#F8F8F8]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="md:space-y-12 space-y-7"
        >
          {/* Section Header */}
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="text-[#FEC845] md:text-sm text-xs uppercase font-medium md:mb-4 mb-3"
            >
              PORTFOLIO
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="md:text-[64px] text-[30px] font-semibold md:tracking-[-3px] tracking-[-1px] leading-[115%]"
            >
              OUR WORK SPEAKS
              <br />
              FOR ITSELF
            </motion.h2>
          </div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[19px]"
          >
            {portfolioItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <PortfolioItem item={item} />
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <ViewAllCard />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
