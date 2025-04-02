"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";

const processSteps = [
  {
    number: "1",
    title: "GET A QUOTE",
    description: (
      <>
        Start by providing a{" "}
        <span className="font-bold underline">quick brief</span> or{" "}
        <span className="font-bold underline">selecting a product</span> for a
        quote. Share details about your project, including the type of shots you
        need, style preferences, and any specific requirements. If you need
        assistance, you can also{" "}
        <Link href="/contact" className="font-bold underline">
          book a call
        </Link>{" "}
        to discuss your project in detail.
      </>
    ),
  },
  {
    number: "2",
    title: "PREPARE FOR THE SHOOT",
    description:
      "Once your quote is approved, you'll complete the payment, provide reference images or mood boards, ship the product to us, and ensure any necessary props or items are available, either by supplying them yourself or letting us source them for you.",
  },
  {
    number: "3",
    title: "SHOOTING & RETOUCHING",
    description: (
      <>
        We take care of the shoot, ensuring high-quality images that align with
        your vision. Retouching includes color correction, background cleanup,
        and enhancements. Any complex manipulations, such as fixing product
        damage, will incur{" "}
        <span className="font-bold underline">additional fees</span>.
      </>
    ),
  },
  {
    number: "4",
    title: "REVIEW & FINAL APPROVAL",
    description: (
      <>
        Once the images are ready, you'll review and approve them. You can
        request revisions, but any revisions due to unclear direction from the
        client will attract{" "}
        <span className="font-bold underline">additional fees</span>. After
        approval, we'll arrange for the return of your product.
      </>
    ),
  },
];

const ProcessSection = () => {
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
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full pt-[32px] pb-[56px] bg-[#F8F8F8]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-10"
        >
          {/* Section Header */}
          <div>
            <motion.div
              variants={itemVariants}
              className="text-yellow-500 uppercase font-medium mb-2"
            >
              OUR PROCESS
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-[64px] font-semibold tracking-[-3px] leading-[115%]"
            >
              IT'S A 4-STEP PROCESS
            </motion.h2>
          </div>

          <div className="flex ">
            <div className="w-[60px] relative flex flex-col items-start mt-6">
              {processSteps.map((step, index) => (
                <div
                  key={`timeline-${index}`}
                  className="flex flex-col items-center"
                >
                  {/* Circle */}
                  <motion.div
                    className="w-[26px] h-[26px] rounded-full border border-black flex-shrink-0"
                    variants={circleVariants}
                    custom={index}
                  ></motion.div>

                  {/* Line */}
                  {index < processSteps.length - 1 && (
                    <motion.div
                      className="w-[1px] h-[250px] bg-black origin-top my-2"
                      variants={lineVariants}
                      custom={index}
                    ></motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Content Column */}
            <div className="flex-1 space-y-0">
              {processSteps.map((step, index) => (
                <motion.div
                  key={`content-${index}`}
                  variants={itemVariants}
                  custom={index}
                  className={`border border-[#C9C9C9] bg-white ${
                    index < processSteps.length - 1 ? "mb-[28px]" : ""
                  }`}
                >
                  <div className="">
                    <h3 className="text-[28px] font-bold leading-[115%] p-7 border-b">
                      <span className="text-[#A0A0A0]">{step.number}.</span>{" "}
                      {step.title}
                    </h3>
                    <p className=" text-[24px] p-7">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
