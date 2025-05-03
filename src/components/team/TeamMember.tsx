import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { JSX, ReactNode, useState, ReactElement } from "react";
import { PiCaretDown } from "react-icons/pi";

// Helper function to recursively extract text from JSX elements
const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }
  if (typeof children === "number") {
    return children.toString();
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (React.isValidElement(children)) {
    const element = children as any;
    return extractTextFromChildren(element.props.children);
  }
  return "";
};

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
  const [isExpanded, setIsExpanded] = useState(false);

  const bioParagraphsText = bio.map((paragraph) =>
    extractTextFromChildren(paragraph.props.children)
  );

  const fullBioText = bioParagraphsText.join(" ");

  const charLimit = 300;
  const needsTruncation = fullBioText.length > charLimit;

  // Determine how many paragraphs to show before truncation
  let charCount = 0;
  let truncateIndex = 0;
  let remainingText = "";
  for (let i = 0; i < bioParagraphsText.length; i++) {
    const paragraphLength = bioParagraphsText[i].length;
    if (charCount + paragraphLength > charLimit) {
      // Truncate within this paragraph
      const remainingChars = charLimit - charCount;
      const truncatedParagraph = bioParagraphsText[i].substring(
        0,
        bioParagraphsText[i].lastIndexOf(" ", remainingChars)
      );
      remainingText = truncatedParagraph + "...";
      truncateIndex = i;
      break;
    }
    charCount += paragraphLength + 1; // +1 for the space between paragraphs
    truncateIndex = i + 1;
  }

  // Animation variants for the bio expansion on mobile
  const bioVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center md:items-start gap-8 md:mb-20 mb-[56px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`relative ${
          imagePosition === "left" ? "md:order-first" : "md:order-last"
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={364}
            height={364}
            className="object-cover"
          />
          <div
            className={`absolute w-[29px] h-[29px] rounded-full bg-yellow-400 ${
              imagePosition === "left" ? "left-2 top-10" : "left-11 top-2"
            }`}
          />
        </div>
      </motion.div>

      <div
        className={`flex-1 text-left ${
          imagePosition === "right" ? "md:pr-8" : "md:pl-8"
        }`}
      >
        <motion.h3
          className="md:text-[28px] text-[24px] font-semibold leading-[155%] text-[#1D1D1B] uppercase"
          initial={{ opacity: 0, x: imagePosition === "left" ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {name}
        </motion.h3>
        <motion.p
          className="text-[#444444] md:text-[20px] text-base uppercase font-medium mb-4"
          initial={{ opacity: 0, x: imagePosition === "left" ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {title}
        </motion.p>

        <div className="space-y-4 max-w-[772px] mx-auto md:mx-0">
          <div className="hidden md:block">
            <div className="space-y-4">
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

          <div className="md:hidden">
            {isExpanded ? (
              // Show full text
              <div className="space-y-4">
                {bio.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-[#444444] text-sm leading-[155%]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            ) : (
              // Show truncated text
              <div className="space-y-4">
                {bio.slice(0, truncateIndex).map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-[#444444] text-sm leading-[155%]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
                {needsTruncation && truncateIndex < bio.length && (
                  <motion.p
                    className="text-[#444444] text-sm leading-[155%]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + truncateIndex * 0.1,
                    }}
                  >
                    {remainingText}
                  </motion.p>
                )}
              </div>
            )}

            {/* Show More/Show Less Button */}
            {needsTruncation && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 flex items-center gap-2 text-[#C49524] text-sm font-medium hover:underline md:hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? "Show Less" : "Show More"}

                <PiCaretDown
                  className={`transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
