"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { categories, portfolios } from "@/lib/mockData";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [visibleItems, setVisibleItems] = useState(9);
  const [isLoaded, setIsLoaded] = useState(false);

  const filteredItems =
    selectedCategory === "ALL"
      ? portfolios
      : portfolios.filter((item) => item.category === selectedCategory);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 9);
  };

  useEffect(() => {
    setVisibleItems(9);
  }, [selectedCategory]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className=" bg-white pt-[100px]">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          key={selectedCategory}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[82.83px] font-semibold mb-[30px] leading-[115%] tracking-[-3px]"
        >
          {selectedCategory === "ALL" ? "OUR PORTFOLIO" : selectedCategory}
        </motion.h1>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-[10px] rounded-full cursor-pointer ${
                selectedCategory === category
                  ? "text-[#1D1D1B] font-semibold border border-[#1D1D1B]"
                  : "bg-white text-[#787878] border-gray-300 border border-[#C9C9C9]"
              } transition-colors`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.3 + index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <AnimatePresence mode="wait">
            {filteredItems.slice(0, visibleItems).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: (index * 0.1) % 0.9,
                  ease: "easeOut",
                }}
                className="relative aspect-square overflow-hidden group border-[0.5px] border-[#C9C9C9]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white py-4 px-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Link
                    href={`/portfolio/finalize?id=${item.id}`}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">I WANT THIS LOOK</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More Button */}
        {filteredItems.length > visibleItems && (
          <div className="flex justify-center mt-10">
            <motion.button
              onClick={handleShowMore}
              className="w-[171px] h-[55px] flex items-center justify-center uppercase bg-white text-[#1D1D1B] border border-[#C9C9C9] font-semibold cursor-pointer "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHOW MORE
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
