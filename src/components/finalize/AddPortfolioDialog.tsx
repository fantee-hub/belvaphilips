// components/finalize/AddPortfolioDialog.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { portfolios, categories } from "@/lib/mockData";

interface AddPortfolioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProduct: (product: any) => void;
  selectedProductIds: number[];
  category: string | null;
}

export default function AddPortfolioDialog({
  open,
  onOpenChange,
  onSelectProduct,
  selectedProductIds,
  category,
}: AddPortfolioDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || "ALL"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown toggle

  // Filter products based on category and already selected products
  const filteredProducts = portfolios.filter((item) => {
    // Filter out already selected products
    if (selectedProductIds.includes(item.id)) return false;

    // Filter by category if not ALL
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  const updateTab = (tab: string) => {
    setSelectedCategory(tab);
    setIsDropdownOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:!max-w-[1199px] max-w-[343px] max-h-[80vh] !rounded-none mt-3 overflow-y-auto scrollbar-hide !px-2 md:!px-5 ">
        <DialogHeader className="hidden">
          <DialogTitle>Select Additional Portfolio Items</DialogTitle>
        </DialogHeader>

        {/* Category Filters  */}
        <div className="hidden md:flex md:flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full md:text-base text-sm cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white border border-[#1D1D1B] text-[#1D1D1B] font-semibold"
                  : "border-[0.5px] border-[#C9C9C9] text-[#787878] font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Category Dropdown - Mobile Only */}
        <div className="md:hidden relative mb-4">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-3 h-[34px] rounded-full border border-[#1D1D1B] text-[#1D1D1B] font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedCategory}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
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
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => updateTab(cat)}
                      className={`px-4 py-2 text-left text-[#787878] hover:bg-gray-100 ${
                        selectedCategory === cat
                          ? "font-semibold text-[#1D1D1B]"
                          : ""
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="relative aspect-square cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                onSelectProduct(product);
                onOpenChange(false);
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover border-[0.44px] border-[#C9C9C9]"
              />
              <div className="absolute inset-0 bg-[#00000080] !bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium">Select</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No more items available in this category
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
