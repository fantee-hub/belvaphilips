// components/home/USPSection.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";

const benefits = [
  {
    icon: "days",
    description: "Get stunning product shots in as little as 7 business days.",
  },
  {
    icon: "shipping",
    description:
      "Simply ship your products and track the status, we'll handle the magic!",
  },
  {
    icon: "dollar",
    description:
      "Pixel-perfect imagery that doesn't just showcase your product, it sells it",
  },
];

// Custom Icons Components
const DaysIcon = () => (
  <div className=" h-32 flex space-x-[14px]">
    <div className="flex items-center gap-4 md:-mb-8 -mb-1">
      <span className="text-gray-200 md:text-[30px] text-[23.97px]">9</span>
      <span className="text-gray-200 md:text-[30px] text-[23.97px]">8</span>
    </div>

    <div className="flex items-baseline">
      <span className="md:text-[86px] text-[68.73px] font-medium">7</span>
      <span className="md:text-[30px] text-[23.97px] font-medium ml-1">
        days
      </span>
    </div>
  </div>
);

const ShippingIcon = () => (
  <div className="h-32 flex items-center justify-center">
    <div className="relative">
      {/* Left circle */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-[#E1E1E1] flex items-center justify-center text-[#E1E1E1]">
        <IoMdCheckmark />
      </div>

      {/* Horizontal line */}
      <div className="w-60 h-px bg-gray-200"></div>

      {/* Center box icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-black flex items-center justify-center bg-white">
        <Image
          src="/assets/images/Cube.png"
          width={44}
          height={44}
          alt="cube"
        />
      </div>

      {/* Right circle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-white border border-[#E1E1E1]"></div>
    </div>
  </div>
);

const DollarIcon = () => (
  <div className="h-32 flex items-center justify-center">
    <div className="relative flex items-center gap-[5px]">
      <span className="md:text-[28.64px] text-[20.97px] font-medium text-[#E1E1E1]">
        ₦
      </span>
      <span className="md:text-[40.91px] text-[31.45px] font-medium text-[#E1E1E1]">
        ₦
      </span>
      <span className="md:text-[86.01px] text-[70.24px] font-medium">₦</span>
      <span className="md:text-[40.91px] text-[31.45px] font-medium text-[#E1E1E1]">
        ₦
      </span>
      <span className="md:text-[28.64px] text-[20.97px] font-medium text-[#E1E1E1]">
        ₦
      </span>
    </div>
  </div>
);

const USPSection = () => {
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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "days":
        return <DaysIcon />;
      case "shipping":
        return <ShippingIcon />;
      case "dollar":
        return <DollarIcon />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full md:py-[102px] py-[87px] bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-9"
        >
          {/* Section Header */}
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="text-[#FEC845] md:text-sm text-xs uppercase mb-1"
            >
              BENEFITS
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="md:text-[64px] text-[30px] font-semibold md:tracking-[-3px] tracking-[-1px]"
            >
              WHY CHOOSE US?
            </motion.h2>
          </div>

          {/* Benefits Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border border-[#C9C9C9] pt-[0px] pb-[50px] px-8 flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {renderIcon(benefit.icon)}
                <p className="text-[#444444] md:mt-4 mt-1 md:text-lg text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default USPSection;
