// components/finalize/AddPortfolioDialog.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

  // Filter products based on category and already selected products
  const filteredProducts = portfolios.filter((item) => {
    // Filter out already selected products
    if (selectedProductIds.includes(item.id)) return false;

    // Filter by category if not ALL
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[1199px] max-h-[80vh] !rounded-none mt-3 overflow-y-auto scrollbar-hide">
        <DialogHeader className="hidden">
          <DialogTitle>Select Additional Portfolio Items</DialogTitle>
        </DialogHeader>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-base cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white border border-[#1D1D1B] text-[#1D1D1B] font-semibold"
                  : "border-[0.5px] border-[#C9C9C9] text-[#787878] font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
