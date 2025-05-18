"use client";
import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import { useRouter } from "next/navigation";

const videoOptions = [
  {
    title: "30 SECS ANIMATION",
    description: "",
    image:
      "https://res.cloudinary.com/kingkunmi/video/upload/v1747420222/1_althou.mov",
    timeline: "7 business days",
    price: "₦250,000/video",
    badge: "basic" as const,
    format_type: "video",
  },
  {
    title: "1 MIN ANIMATION",
    description: "",
    image:
      "https://res.cloudinary.com/kingkunmi/video/upload/v1747420806/6_jh98km.mov",
    timeline: "7 business days",
    price: "₦350,000/image",
    badge: "basic" as const,
    format_type: "video",
  },
  {
    title: "15 SECS ANIMATION",
    description: "",
    image:
      "https://res.cloudinary.com/kingkunmi/video/upload/v1747421394/3_fjlosx.mov",
    timeline: "7 business days",
    price: "₦350,000/image",
    badge: "premium" as const,
    format_type: "video",
  },
  {
    title: "30 SECS ANIMATION",
    description: "",
    image:
      "https://res.cloudinary.com/kingkunmi/video/upload/v1747565053/2_iwgthp.mov",
    timeline: "7 business days",
    price: "₦450,000/image",
    badge: "premium" as const,
    format_type: "video",
  },
  {
    title: "1 MIN ANIMATION",
    description: "",
    image:
      "https://res.cloudinary.com/kingkunmi/video/upload/v1747565067/4_dgrown.mov",
    timeline: "7 business days",
    price: "₦650,000/image",
    badge: "premium" as const,
    format_type: "video",
  },
  {
    title: "360° SPIN",
    description: "",
    image:
      "https://res.cloudinary.com/kingkunmi/video/upload/v1747565079/5_soeomv.mov",
    timeline: "7 business days",
    price: "₦650,000/image",
    badge: "" as const,
    format_type: "video",
  },
];

export default function ProductVideosSection() {
  const router = useRouter();
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

  const handleClick = (option: any) => {
    const config = {
      finish: "",
      shootType: "VIDEO",
      quantity: 0,
      basePrice: "",
      category: "",
      total: "",
      price: "",
      membershipPlan: "",
      rate: option.badge,
      animationPackage: option.title,
    };
    localStorage.setItem("productConfig", JSON.stringify(config));
    router.push("/finalize");
    console.log(config);
  };

  return (
    <motion.div variants={itemVariants} className="md:pt-[40px] pt-0 space-y-6">
      <div className="max-w-[795px]">
        <h2 className="md:text-[28px] text-[26px] text-[#1D1D1B] md:font-medium font-semibold mb-2 leading-[145%]">
          PRODUCT VIDEOS
        </h2>
        <p className="text-[#444444] md:font-medium md:text-base text-sm">
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
            badge={option.badge}
            format_type={option.format_type}
            onClick={() => handleClick(option)}
          />
        ))}
      </div>
    </motion.div>
  );
}
