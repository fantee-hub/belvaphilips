"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    id: 1,
    company: "TECNO",
    logo: "/images/testimonials/tecno.png",
    position: "Head of marketing at Tecno",
    quote:
      '"Sales doubled after updating our website with these photos. The quality speaks for itself!"',
    highlight: "Sales doubled",
  },
  {
    id: 2,
    company: "BEAUTY BY AD",
    logo: "/images/testimonials/beauty.png",
    position: "CEO at BeatyByAd",
    quote:
      '"Every shot was pure perfection! Our product images finally match the high quality of our brand."',
    highlight: "pure perfection!",
  },
  {
    id: 3,
    company: "Smirnoff",
    logo: "/images/testimonials/smirnoff.png",
    position: "Head of Digital Marketing",
    quote:
      '"We noticed a significant increase in engagement on Instagram after using their professional lifestyle shots."',
    highlight: "significant increase",
  },
  {
    id: 4,
    company: "Nokia",
    logo: "/images/testimonials/nokia.png",
    position: "Product Manager",
    quote:
      '"The attention to detail in every image exceeded our expectations. Worth every penny."',
    highlight: "exceeded our expectations",
  },
  {
    id: 5,
    company: "Indomie",
    logo: "/images/testimonials/indomie.png",
    position: "Marketing Director",
    quote:
      '"Our campaign conversion rates improved by 40% after implementing their photography."',
    highlight: "improved by 40%",
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
    <p className="text-xl">
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
    <section
      className="w-full py-20 bg-white border-t border-gray-100"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Section Header */}
          <div>
            <motion.div
              variants={itemVariants}
              className="text-yellow-500 uppercase font-medium mb-2"
            >
              REVIEWS
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-5xl font-bold leading-tight"
            >
              SEE THE RESULTS THROUGH
              <br />
              OUR CLIENTS' LENS
            </motion.h2>
          </div>

          {/* Testimonials Slider */}
          <motion.div variants={itemVariants} className="w-full">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={24}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="w-full"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="border border-gray-200 p-6 h-full">
                    <div className="mb-6">
                      <div className="h-8 mb-1">
                        <Image
                          src={testimonial.logo}
                          alt={testimonial.company}
                          width={120}
                          height={32}
                          className="h-full w-auto object-contain object-left"
                        />
                      </div>
                      <p className="text-gray-600">{testimonial.position}</p>
                    </div>
                    <div className="text-gray-600">
                      <HighlightedQuote
                        quote={testimonial.quote}
                        highlight={testimonial.highlight}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
