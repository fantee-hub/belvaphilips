import { motion } from "framer-motion";
import PricingCard from "./PricingCard";

const videoOptions = [
  {
    title: "30 SECS ANIMATION",
    description: "",
    image: "/assets/pricing/basic.png",
    timeline: "7 business days",
    price: "₦250,000/video",
    badge: "basic" as const,
  },
  {
    title: "1 MIN ANIMATION",
    description: "",
    image: "/assets/pricing/basic.png",
    timeline: "7 business days",
    price: "₦350,000/image",
    badge: "basic" as const,
  },
  {
    title: "15 SECS ANIMATION",
    description: "",
    image: "/assets/pricing/basic.png",
    timeline: "7 business days",
    price: "₦350,000/image",
    badge: "premium" as const,
  },
  {
    title: "30 SECS ANIMATION",
    description: "",
    image: "/assets/pricing/basic.png",
    timeline: "7 business days",
    price: "₦450,000/image",
    badge: "premium" as const,
  },
  {
    title: "1 MIN ANIMATION",
    description: "",
    image: "/assets/pricing/basic.png",
    timeline: "7 business days",
    price: "₦650,000/image",
    badge: "premium" as const,
  },
  {
    title: "360° SPIN",
    description: "",
    image: "/assets/pricing/basic.png",
    timeline: "7 business days",
    price: "₦650,000/image",
    badge: "basic" as const,
  },
];

export default function ProductVideosSection() {
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
    <motion.div variants={itemVariants} className="pt-[40px] space-y-6">
      <div className="max-w-[795px]">
        <h2 className="text-[28px] text-[#1D1D1B] font-medium mb-2 leading-[145%]">
          PRODUCT VIDEOS
        </h2>
        <p className="text-[#444444] font-medium">
          Bring your products to life through eye-catching videography and
          stop-motion. Using props and colorful backgrounds, we create dynamic
          visuals perfect for your product content across all platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 relative">
        {videoOptions.map((option, index) => (
          <PricingCard
            key={index}
            title={option.title}
            description={option.description}
            image={option.image}
            timeline={option.timeline}
            price={option.price}
            type={option.badge}
          />
        ))}
      </div>
    </motion.div>
  );
}
