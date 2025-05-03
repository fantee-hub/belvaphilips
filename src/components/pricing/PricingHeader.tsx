// components/pricing/PricingHeader.tsx
import { motion } from "framer-motion";

export default function PricingHeader() {
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
    <motion.div variants={itemVariants} className="mb-10">
      <h1 className="md:text-[82.83px] text-[38px] font-semibold leading-[115%] md:tracking-[-3px] tracking-[-0.5px]">
        PRICING
      </h1>
    </motion.div>
  );
}
