// components/home/ProductSelectionForm.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const productOptions = {
  Clothing: ["Model", "Flatlay", "Ghost", "Pinned", "Video"],
  Shoes: ["Model", "Catalogue", "Video"],
  Bags: ["Model", "Catalogue", "Hanged", "Video"],
  Beauty: ["Model", "Catalogue", "Swatch", "Video"],
  Jewelry: ["Model", "Catalogue", "Video"],
  Drinks: ["Catalogue", "Video"],
};

type ProductType = keyof typeof productOptions;

const ProductSelectionForm = () => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isShootTypeDropdownOpen, setIsShootTypeDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [selectedShootType, setSelectedShootType] = useState<string | null>(
    null
  );

  const handleProductSelect = (product: ProductType) => {
    setSelectedProduct(product);
    setSelectedShootType(null);
    setIsProductDropdownOpen(false);
  };

  const handleShootTypeSelect = (shootType: string) => {
    setSelectedShootType(shootType);
    setIsShootTypeDropdownOpen(false);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.98,
    },
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
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Get available shoot types based on selected product
  const availableShootTypes = selectedProduct
    ? productOptions[selectedProduct]
    : [];

  const productCategories = Object.keys(productOptions) as ProductType[];
  const topRow = productCategories.slice(0, 3);
  const bottomRow = productCategories.slice(3, 6);

  return (
    <motion.div
      className="flex flex-wrap gap-3 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Product Dropdown */}
      <div className="relative w-full sm:w-auto">
        <button
          onClick={() => {
            setIsProductDropdownOpen(!isProductDropdownOpen);
            setIsShootTypeDropdownOpen(false);
          }}
          className="flex justify-between items-center w-full cursor-pointer sm:w-[210px] sm:h-[47px] px-6 py-4 bg-[#F4F4F4] rounded-full text-[#585858] focus:outline-none focus:ring-1 focus:ring-black"
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
              className="absolute z-50 mt-2 w-full min-w-[315px] bg-white border border-[#C9C9C9] rounded-[20px] overflow-hidden"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="py-6 px-4">
                {/* Top Row */}
                <div className="flex justify-between items-center">
                  {topRow.map((product, index) => (
                    <div key={product} className="flex-1 text-center relative">
                      <motion.button
                        variants={itemVariants}
                        custom={index}
                        onClick={() => handleProductSelect(product)}
                        className="font-medium hover:text-gray-600 transition-colors  w-full cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {product}
                      </motion.button>
                      {index < topRow.length - 1 && (
                        <div className="absolute h-8 top-0 right-0 border-r border-[#C9C9C9]"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <motion.div
                  className="border-t border-[#C9C9C9] my-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                ></motion.div>

                {/* Bottom Row */}
                <div className="flex justify-between">
                  {bottomRow.map((product, index) => (
                    <div key={product} className="flex-1 text-center relative">
                      <motion.button
                        variants={itemVariants}
                        custom={index + 3}
                        onClick={() => handleProductSelect(product)}
                        className="font-medium hover:text-gray-600 transition-colors w-full cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {product}
                      </motion.button>
                      {index < bottomRow.length - 1 && (
                        <div className="absolute h-8 top-0 right-0 border-r border-gray-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shoot Type Dropdown */}
      <div className="relative w-full sm:w-auto">
        <button
          onClick={() => {
            if (selectedProduct) {
              setIsShootTypeDropdownOpen(!isShootTypeDropdownOpen);
              setIsProductDropdownOpen(false);
            }
          }}
          disabled={!selectedProduct}
          className={`flex justify-between items-center w-full sm:w-[210px] sm:h-[47px] px-6 py-4 bg-[#F4F4F4] rounded-full focus:outline-none focus:ring-1 focus:ring-black cursor-pointer ${
            !selectedProduct
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700"
          }`}
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
                className="absolute z-50 mt-2 w-full min-w-[300px] bg-white border border-[#C9C9C9] rounded-3xl shadow-lg overflow-hidden"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="py-6 px-4">
                  <div className="flex justify-between">
                    {availableShootTypes.slice(0, 3).map((shootType, index) => (
                      <div
                        key={shootType}
                        className="flex-1 text-center relative"
                      >
                        <motion.button
                          variants={itemVariants}
                          custom={index}
                          onClick={() => handleShootTypeSelect(shootType)}
                          className=" font-medium hover:text-gray-600 transition-colors w-full px-3 cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {shootType}
                        </motion.button>
                        {index < availableShootTypes.slice(0, 3).length - 1 && (
                          <div className="absolute h-8 top-0 right-0 border-r border-[#C9C9C9]"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {availableShootTypes.length > 3 && (
                    <>
                      {/* Divider */}
                      <motion.div
                        className="border-t border-[#C9C9C9] my-6"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      ></motion.div>

                      {/* Bottom Row */}
                      <div className="flex justify-between">
                        {availableShootTypes
                          .slice(3)
                          .map((shootType, index) => (
                            <div
                              key={shootType}
                              className="flex-1 text-center relative"
                            >
                              <motion.button
                                variants={itemVariants}
                                custom={index + 3}
                                onClick={() => handleShootTypeSelect(shootType)}
                                className=" font-medium hover:text-gray-600 transition-colors w-full cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {shootType}
                              </motion.button>
                              {index <
                                availableShootTypes.slice(3).length - 1 && (
                                <div className="absolute h-8 top-0 right-0 border-r border-[#C9C9C9]"></div>
                              )}
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Get Quote Button */}
      <motion.button
        className={`w-[162px] h-[47px] rounded-full cursor-pointer font-semibold transition-colors ${
          selectedProduct && selectedShootType
            ? "bg-black text-white hover:bg-gray-900"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        disabled={!selectedProduct || !selectedShootType}
        whileHover={selectedProduct && selectedShootType ? { scale: 1.03 } : {}}
        whileTap={selectedProduct && selectedShootType ? { scale: 0.98 } : {}}
      >
        GET QUOTE
      </motion.button>
    </motion.div>
  );
};

export default ProductSelectionForm;
