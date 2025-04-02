"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    id: 1,
    company: "TECNO",
    logo: "/assets/brands/tecno.png",
    position: "Head of marketing at Tecno",
    quote:
      '"Sales doubled after updating our website with these photos. The quality speaks for itself!"',
    highlight: "Sales doubled",
  },
  {
    id: 2,
    company: "BEAUTY BY AD",
    logo: "/assets/brands/beauty-by-ad.png",
    position: "CEO at BeatyByAd",
    quote:
      '"Every shot was pure perfection! Our product images finally match the high quality of our brand."',
    highlight: "pure perfection!",
  },
  {
    id: 3,
    company: "Smirnoff",
    logo: "/assets/brands/Smirnoff.png",
    position: "Head of Digital Marketing",
    quote:
      '"We noticed a significant increase in engagement on Instagram after using their professional lifestyle shots."',
    highlight: "significant increase",
  },
  {
    id: 4,
    company: "Ribenna",
    logo: "/assets/brands/ribena.png",
    position: "CEO at Ribena",
    quote:
      '"Our ads are performing better, click-through rates have doubled since we started using BelvaPhilips!"',
    highlight: " click-through rates have doubled",
  },
];

const HighlightedQuote = ({
  quote,
  highlight,
}: {
  quote: string;
  highlight: string;
}) => {
  if (!highlight || !quote.includes(highlight)) {
    return <p className="text-xl">{quote}</p>;
  }

  const parts = quote.split(highlight);
  return (
    <p className="text-xl font-bold">
      {parts[0]}
      <span className="font-bold text-black">{highlight}</span>
      {parts[1]}
    </p>
  );
};

const TestimonialsSection = () => {
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
    <section className="w-full pb-[120px] bg-white" ref={ref}>
      <div className=" px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-10"
        >
          {/* Section Header */}
          <div className="container mx-auto">
            <motion.div
              variants={itemVariants}
              className="text-[#FEC845] text-sm uppercase mb-2"
            >
              REVIEWS
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-[64px] font-semibold leading-[115%] tracking-[-3px]"
            >
              SEE THE RESULTS THROUGH
              <br />
              OUR CLIENTS' LENS
            </motion.h2>
          </div>

          {/* Testimonials Slider */}
          <motion.div variants={itemVariants} className="w-full">
            <Marquee gradient={false} speed={80} pauseOnHover>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`border border-gray-200 p-6 h-full max-w-[655px] w-full mr-6 relative`}
                >
                  <div className="mb-5">
                    <div className="h-[120px] mb-3 flex items-center  absolute -top-[30px]">
                      <div
                        style={{
                          maxWidth: "70px",
                          minHeight: "12px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={testimonial.logo}
                          alt={testimonial.company}
                          width={71}
                          height={50}
                          style={{
                            maxHeight: "120px",

                            objectFit: "contain",
                            objectPosition: "left",
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#444444] font-medium text-[18px] mt-10">
                      {testimonial.position}
                    </p>
                  </div>
                  <div className="text-gray-600">
                    <HighlightedQuote
                      quote={testimonial.quote}
                      highlight={testimonial.highlight}
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
