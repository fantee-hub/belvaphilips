"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import AddPortfolioDialog from "./AddPortfolioDialog";

interface SelectedShotsSectionProps {
  selectedProducts: any[];
  onRemoveProduct: (id: number) => void;
  onAddProduct: (product: any) => void;
}

export default function SelectedShotsSection({
  selectedProducts,
  onRemoveProduct,
  onAddProduct,
}: SelectedShotsSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:mb-7 mb-6">
      <h2 className="md:text-[28px] text-[26px] font-semibold md:mb-2 mb-0">
        YOUR SELECTED SHOT
      </h2>
      <p className="text-[#444444] mb-6 md:text-base text-sm">
        Review your selected shot to ensure it aligns with your vision.
      </p>

      <div className="flex flex-wrap gap-4 border-b border-[#D1D1D1] pb-7">
        {selectedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="border border-[#1D1D1B] p-2 w-[134.16px] h-[142px] relative"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 pb-[2px] pr-2 gap-1 right-0 flex items-center space-x-1 bg-white left-0 justify-end">
              <button className="bg-white rounded-full p-1 cursor-pointer">
                <Pencil className="h-4 w-4" />
              </button>
              <div className="w-[0.5px] h-[15px] bg-[#CFCFCF]"></div>
              <button
                className="bg-white rounded-full p-1 cursor-pointer"
                onClick={() => onRemoveProduct(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}

        <div
          onClick={() => setOpen(true)}
          className="border-[0.5px] border-[#C9C9C9] p-2 w-[134.16px] h-[142px] flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer hover:bg-gray-50"
        >
          <span className="block mb-1 text-sm text-[#1D1D1B]">
            Add another portfolio shot
          </span>
        </div>
      </div>

      <AddPortfolioDialog
        open={open}
        onOpenChange={setOpen}
        onSelectProduct={onAddProduct}
        selectedProductIds={selectedProducts.map((p) => p.id)}
        category={
          selectedProducts.length > 0 ? selectedProducts[0].category : null
        }
      />
    </div>
  );
}
