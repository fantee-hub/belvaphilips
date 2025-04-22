import Image from "next/image";
import { motion } from "framer-motion";
import { JSX } from "react";

interface TeamMemberProps {
  name: string;
  title: string;
  bio: JSX.Element[];
  image: string;
  imagePosition: "left" | "right";
}

export default function TeamMember({
  name,
  title,
  bio,
  image,
  imagePosition,
}: TeamMemberProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-start gap-8 mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {imagePosition === "left" && (
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative ">
            <Image
              src={image}
              alt={name}
              width={364}
              height={364}
              className="object-cover"
            />
            <div className="absolute left-2 top-10 w-[29px] h-[29px] rounded-full bg-yellow-400" />
          </div>
        </motion.div>
      )}

      <div
        className={`flex-1 ${
          imagePosition === "right" ? "md:pr-8" : "md:pl-8"
        }`}
      >
        <motion.h3
          className="text-[28px] font-semibold leading-[155%] text-[#1D1D1B] uppercase"
          initial={{ opacity: 0, x: imagePosition === "left" ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {name}
        </motion.h3>
        <motion.p
          className="text-[#444444] text-[20px] uppercase font-medium mb-4"
          initial={{ opacity: 0, x: imagePosition === "left" ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {title}
        </motion.p>

        <div className="space-y-4 max-w-[772px]">
          {bio.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-[#444444] text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>

      {imagePosition === "right" && (
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative ">
            <Image
              src={image}
              alt={name}
              width={364}
              height={364}
              className="object-cover"
            />
            <div className="absolute left-11 top-2 w-[29px] h-[29px] rounded-full bg-yellow-400" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
