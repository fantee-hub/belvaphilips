"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-4 md:right-8 flex items-center justify-center gap-2 w-[141px] h-[35px] rounded-full border-[0.93px] border-[#1D1D1B] bg-white text-[#1D1D1B] text-xs font-semibold text-sm uppercase transition-opacity duration-300 z-50 cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Back to Top
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.90505 7.08065L8.62567 2.36003C8.67438 2.31126 8.73223 2.27258 8.79591 2.24618C8.85958 2.21979 8.92784 2.2062 8.99676 2.2062C9.06569 2.2062 9.13395 2.21979 9.19762 2.24618C9.2613 2.27258 9.31914 2.31126 9.36786 2.36003L14.0885 7.08065C14.1869 7.17907 14.2422 7.31255 14.2422 7.45174C14.2422 7.59093 14.1869 7.72441 14.0885 7.82283C13.9901 7.92125 13.8566 7.97655 13.7174 7.97655C13.5782 7.97655 13.4447 7.92125 13.3463 7.82283L9.52128 3.99717L9.52128 14.2704C9.52128 14.4095 9.46602 14.5429 9.36765 14.6413C9.26929 14.7397 9.13588 14.7949 8.99677 14.7949C8.85766 14.7949 8.72424 14.7397 8.62588 14.6413C8.52751 14.5429 8.47225 14.4095 8.47225 14.2704L8.47225 3.99717L4.64724 7.82283C4.54882 7.92125 4.41534 7.97655 4.27615 7.97655C4.13696 7.97655 4.00348 7.92126 3.90506 7.82283C3.80663 7.72442 3.75134 7.59093 3.75134 7.45174C3.75134 7.31256 3.80663 7.17907 3.90505 7.08065Z"
          fill="#1D1D1B"
        />
      </svg>
    </motion.button>
  );
}
