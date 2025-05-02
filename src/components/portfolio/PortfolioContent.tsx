"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { categories, portfolios } from "@/lib/mockData";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PiCaretDownBold } from "react-icons/pi";

export default function PortfolioContent() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [visibleItems, setVisibleItems] = useState(9);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

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

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedCategory(tab);
    } else {
      setSelectedCategory("ALL");
    }
  }, [searchParams]);

  const updateTab = (tab: string) => {
    setIsDropdownOpen(false);
    router.push(`/portfolio?tab=${tab}`);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-white md:pt-[100px] pt-9">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          key={selectedCategory}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:text-[82.83px] text-[38px] md:font-semibold font-bold md:mb-[30px] mb-7 leading-[115%] md:tracking-[-3px] tracking-[-0.5px]"
        >
          {selectedCategory === "ALL" ? "OUR PORTFOLIO" : selectedCategory}
        </motion.h1>

        {/* Category Filters - Desktop  */}
        <div className="hidden md:flex md:flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => updateTab(category)}
              className={`px-4 py-[10px] rounded-full cursor-pointer ${
                selectedCategory.toLowerCase() === category.toLowerCase()
                  ? "text-[#1D1D1B] font-semibold border border-[#1D1D1B]"
                  : "bg-white text-[#787878] border-gray-300 border border-[#C9C9C9]"
              } transition-colors`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Category Dropdown - Mobile */}
        <div className="md:hidden relative mb-8">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-3 h-[34px] rounded-full border border-[#1D1D1B] text-[#1D1D1B] font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedCategory}
            <PiCaretDownBold
              className={`transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute top-full left-0 mt-2 w-[150px] bg-white border border-[#C9C9C9] rounded-lg shadow-lg z-10"
              >
                <div className="flex flex-col">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => updateTab(category)}
                      className={`px-4 py-2 text-left text-[#787878] hover:bg-gray-100 ${
                        selectedCategory.toLowerCase() ===
                        category.toLowerCase()
                          ? "font-semibold text-[#1D1D1B]"
                          : ""
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="md:w-[171px] w-[127px] md:h-[55px] h-[45px] text-sm md:text-base flex items-center justify-center uppercase bg-white text-[#1D1D1B] border border-[#C9C9C9] font-semibold cursor-pointer"
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
