"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";

const brands = [
  { name: "Tecno", logo: "/assets/brands/tecno.png" },
  { name: "Beauty by AD", logo: "/assets/brands/beauty-by-ad.png" },
  { name: "Indomie", logo: "/assets/brands/indomie.png" },
  { name: "DStv", logo: "/assets/brands/dstv.png" },
  { name: "Nokia", logo: "/assets/brands/nokia.png" },
  { name: "Airtel", logo: "/assets/brands/airtel.png" },
  { name: "Smirnoff", logo: "/assets/brands/Smirnoff.png" },
];

const BrandsStrip = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
        delayChildren: 0.2,
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
    <section className="w-full pb-[60px] ">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-0"
        >
          <motion.p
            variants={itemVariants}
            className="text-[#8A8A8A] text-center md:text-left"
          >
            Captured for leading brands
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-between gap-3 md:gap-1 max-w-[927px] lg:-mt-3 mt-3"
          >
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                variants={itemVariants}
                className=" flex justify-center items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative flex items-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={99}
                    className="max-h-[99px] w-[100px]  object-contain  transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsStrip;
