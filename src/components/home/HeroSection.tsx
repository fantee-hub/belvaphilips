"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/navigation";
import ProductSelectionForm from "./ProductSelectionForm";

const heroImages = [
  {
    src: "/assets/images/hero-image-1.png",
    alt: "Milk product photography",
  },
  {
    src: "/assets/images/hero-image-2.png",
    alt: "Product photography example",
  },
  {
    src: "/assets/images/hero-image-3.png",
    alt: "Professional product photography",
  },
  {
    src: "/assets/images/hero-image-4.png",
    alt: "photography example",
  },
];

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <section className="w-full pt-16 pb-[60px] md:pt-24 md:pb-[60px] relative">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row  gap-10 lg:justify-between">
        {/* Text Content */}
        <div className="w-full lg:w-[734px] pr-0 lg:pr-12 mb-10 lg:mb-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-[71.83px] font-semibold leading-[115%]"
            >
              STUDIO QUALITY PHOTOGRAPHY MADE SIMPLE
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[20px] text-[#444444]"
            >
              We provide high-quality images that make your products look their
              best. From clean catalog images to creative angles, Belvaphilips
              captures every detail to make your products stand out.
            </motion.p>

            <ProductSelectionForm />
          </motion.div>
        </div>

        {/* Image Carousel */}
        <motion.div
          className="w-full lg:w-[542px]"
          variants={imageContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {isClient && (
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={30}
              speed={800}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="w-full h-[500px] overflow-hidden"
            >
              {heroImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
