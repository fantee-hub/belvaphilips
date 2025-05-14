"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { shootTypes } from "@/lib/mockData/portfolioData";

const productOptions: Record<string, string[]> = {};
Object.keys(shootTypes).forEach((category) => {
  const titleCaseCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  productOptions[titleCaseCategory] = shootTypes[
    category as keyof typeof shootTypes
  ].map((type) => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
});

type ProductType = keyof typeof productOptions;

export default function QuoteOption({
  showError,
  productError,
  shootTypeError,
  setProductError,
  setShootTypeError,
  setSelectedProduct,
  setSelectedShootType,
}: {
  showError: boolean;
  productError: boolean;
  shootTypeError: boolean;
  setProductError: (error: boolean) => void;
  setShootTypeError: (error: boolean) => void;
  setSelectedProduct: (product: string | null) => void;
  setSelectedShootType: (shootType: string | null) => void;
}) {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isShootTypeDropdownOpen, setIsShootTypeDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProductLocal] =
    useState<ProductType | null>(null);
  const [selectedShootType, setSelectedShootTypeLocal] = useState<
    string | null
  >(null);

  const handleProductSelect = (product: ProductType) => {
    setSelectedProductLocal(product);
    setSelectedProduct(product);
    setSelectedShootTypeLocal(null);
    setSelectedShootType(null);
    setIsProductDropdownOpen(false);
    setProductError(false);
  };

  const handleShootTypeSelect = (shootType: string) => {
    setSelectedShootTypeLocal(shootType);
    setSelectedShootType(shootType);
    setIsShootTypeDropdownOpen(false);
    setShootTypeError(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const availableShootTypes = selectedProduct
    ? productOptions[selectedProduct]
    : [];
  const productCategories = Object.keys(productOptions) as ProductType[];
  const topRow = productCategories.slice(0, 3);
  const bottomRow = productCategories.slice(3, 6);

  return (
    <div className="space-y-4 bg-gray-100 p-6">
      <div className="flex flex-col gap-3">
        {/* Product Dropdown */}
        <div className="relative w-full">
          <button
            onClick={() => {
              setIsProductDropdownOpen(!isProductDropdownOpen);
              setIsShootTypeDropdownOpen(false);
            }}
            className={`flex justify-between items-center w-full h-[45px] px-4 bg-[#F4F4F4] rounded-full text-[#585858] focus:outline-none focus:ring-1 focus:ring-black border border-[#C9C9C9] cursor-pointer ${
              productError && showError ? "border border-red-500" : ""
            }`}
          >
            <span>{selectedProduct || "Select a product"}</span>
            <motion.div
              animate={{ rotate: isProductDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isProductDropdownOpen && (
              <motion.div
                className="fixed z-50 mt-2 w-[190px] bg-white border border-[#C9C9C9] rounded-[20px] overflow-hidden"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-5 ">
                  {productCategories.map((product, index) => (
                    <div key={product}>
                      <motion.button
                        variants={itemVariants}
                        custom={index}
                        onClick={() => handleProductSelect(product)}
                        className="font-medium hover:text-gray-600 transition-colors w-full cursor-pointer text-left text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {product}
                      </motion.button>
                      {index < productCategories.length - 1 && (
                        <div className="border-b-[0.5px] border-[#C9C9C9] my-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Shoot Type Dropdown */}
        <div className="relative w-full">
          <button
            onClick={() => {
              if (selectedProduct) {
                setIsShootTypeDropdownOpen(!isShootTypeDropdownOpen);
                setIsProductDropdownOpen(false);
              }
            }}
            disabled={!selectedProduct}
            className={`flex justify-between items-center w-full h-[45px] px-4 bg-[#F4F4F4] rounded-full focus:outline-none focus:ring-1 focus:ring-black border border-[#C9C9C9] cursor-pointer ${
              !selectedProduct
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#585858]"
            } ${shootTypeError && showError ? "border border-red-500" : ""}`}
          >
            <span>{selectedShootType || "Select shoot type"}</span>
            <motion.div
              animate={{ rotate: isShootTypeDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isShootTypeDropdownOpen &&
              selectedProduct &&
              availableShootTypes.length > 0 && (
                <motion.div
                  className="fixed z-50 mt-2 w-[190px] bg-white border border-[#C9C9C9] rounded-[20px] overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="p-5">
                    {availableShootTypes.map((shootType, index) => (
                      <div key={shootType}>
                        <motion.button
                          variants={itemVariants}
                          custom={index}
                          onClick={() => handleShootTypeSelect(shootType)}
                          className="font-medium hover:text-gray-600 transition-colors w-full cursor-pointer text-left text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {shootType}
                        </motion.button>
                        {index < availableShootTypes.length - 1 && (
                          <div className="border-b-[0.5px] border-[#C9C9C9] my-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
