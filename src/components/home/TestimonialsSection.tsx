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
    company: "BEAUTY BY AD",
    logo: "/assets/brands/beauty-by-ad.png",
    position: "CEO at BeatyByAd",
    quote:
      '"Belvaphillps Imagery is a good brand. I enjoyed working with them while shooting for my products. I observed the professionalism and attention to details which have kept me satisfied with their service"',
    highlight: "pure perfection!",
  },
  {
    id: 2,
    company: "OMARICODE",
    logo: "/assets/brands/omaricode.png",
    position: "CEO at Omaricode",
    quote:
      "You can't have better elsewhere, Belvaphilips Imagery is tomorrow's photography today.",
    highlight: "Sales doubled",
  },
  {
    id: 3,
    company: "OLAH",
    logo: "/assets/brands/olah.png",
    position: "CEO at Olaherbals",
    quote:
      "Our Ads are performing awesome when we started working with you guys. Your Images drives massive engagements on our instagram.",
    highlight: "significant increase",
  },
  {
    id: 4,
    company: "COSMETIC CHEF",
    logo: "/assets/brands/cosmetic-chef.png",
    position: "Creative Head at CosmeticChef",
    quote:
      "The Videos and the images are very fine. i cant wait to put them out there.",
    highlight: " click-through rates have doubled",
  },
  {
    id: 5,
    company: "STYCHIES",
    logo: "/assets/brands/stychies.png",
    position: "Creative Head at Stychies",
    quote:
      "I'm very impressed and happy with your work on my project, it's amazing. i also wanted to thank you for accomodating my request.",
    highlight: "pure perfection!",
  },
  {
    id: 6,
    company: "HENEDENA",
    logo: "/assets/brands/henedena.png",
    position: "Creative Head at Stychies",
    quote:
      "I'm very impressed and happy with your work on my project, it's amazing. i also wanted to thank you for accomodating my request.",
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
    <p className="text-xl font-bold text-[#7E7E7E]">
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
                  className={`border border-gray-200 p-6  max-w-[635px] h-[314px] w-full mr-6 relative`}
                >
                  <div className="mb-4">
                    <div className="h-[120px] mb-3 flex items-center  absolute -top-[5px]">
                      <div
                        style={{
                          maxWidth: "80px",
                          minHeight: "12px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={testimonial.logo}
                          alt={testimonial.company}
                          width={80}
                          height={50}
                          style={{
                            maxHeight: "100px",

                            objectFit: "contain",
                            objectPosition: "left",
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-[#444444] font-medium text-[18px] mt-[80px]">
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
