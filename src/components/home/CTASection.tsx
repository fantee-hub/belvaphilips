"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const CTASection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const slideImages = [
    "/assets/images/chat-with.png",
    "/assets/images/shoes.png",
    "/assets/images/electronics.png",
    "/assets/images/drinks.png",
    "/assets/images/bags.png",
  ];

  return (
    <section
      className="w-full md:pt-[100px] pt-[90px] pb-[118px] bg-white"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center"
        >
          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0"
          >
            <h2 className="md:text-[63px] text-[30px] font-semibold leading-[115%] md:tracking-[-3px] tracking-[-1px] mb-3 text-center md:text-left">
              NOT SURE WHAT
              <br />
              YOU WANT?
              <br />
              LET'S HAVE A CHAT!
            </h2>
            <p className="text-[#444444] leading-[145%] md:text-lg text-sm text-center md:text-left md:mb-9 mb-7">
              Not sure what style, setting, or session is right for you? No
              worries! Book a quick call or fill out a 3-minute brief, and we'll
              figure it out together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/book-call"
                className="w-[126px] h-[38px] flex items-center justify-center text-sm bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-colors"
              >
                BOOK A CALL
              </Link>
              <Link
                href="/brief"
                className="w-[180px] h-[38px] bg-[#EBEBEB] flex items-center justify-center text-[#1D1D1B] text-sm font-medium rounded-full hover:bg-gray-300 transition-colors"
              >
                FILL A BRIEF INSTEAD
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 relative"
          >
            {isClient && (
              <div className="relative  md:h-[500px] h-[240.59px] w-full overflow-hidden">
                <Swiper
                  modules={[Autoplay, EffectFade]}
                  effect="fade"
                  speed={800}
                  autoplay={{
                    delay: 10,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  className="h-full w-full"
                  fadeEffect={{ crossFade: true }}
                >
                  {slideImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative h-full w-full">
                        <Image
                          src={image}
                          alt={`Model with jewelry ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
