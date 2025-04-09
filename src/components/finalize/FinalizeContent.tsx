"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { portfolios } from "@/lib/mockData";
import SelectedShotsSection from "@/components/finalize/SelectedShotSection";
import ProjectDescriptionSection from "@/components/finalize/ProjectDescriptionSection";
import SummarySection from "@/components/finalize/SummarySection";
import { GoArrowRight } from "react-icons/go";
import Spinner from "@/components/ui/Spinner";

export default function FinalizeContent() {
  const searchParams = useSearchParams();
  const initialProductId = searchParams.get("id");

  const [selectedProducts, setSelectedProducts] = useState<
    (typeof portfolios)[0][]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialProduct = async () => {
      setIsLoading(true);

      if (initialProductId) {
        try {
          const id = parseInt(initialProductId);
          const initialProduct = portfolios.find((item) => item.id === id);
          if (initialProduct) {
            setSelectedProducts([initialProduct]);
          }
        } catch (error) {
          console.error("Error loading product:", error);
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    loadInitialProduct();
  }, [initialProductId]);

  const handleAddProduct = (product: (typeof portfolios)[0]) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  const getProductType = () => {
    if (selectedProducts.length === 0) return "";
    return selectedProducts[0].category;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (selectedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No product selected</h2>
          <Link
            href="/portfolio"
            className="px-6 py-3 bg-black text-white rounded-md inline-block"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[100px] bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-sm text-[#AAAAAA] font-medium flex items-center">
          <Link href="/portfolio" className="hover:text-black">
            PORTFOLIO
          </Link>
          <span className="mx-2">
            <GoArrowRight />
          </span>
          <span className="font-bold text-[#1D1D1B]">FINALIZE</span>
        </div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[46px] font-bold mb-2 leading-[110%]"
        >
          FINALIZE YOUR PROJECT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[#444444] mb-10"
        >
          Review and customize your shoot details before checkout.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <SelectedShotsSection
              selectedProducts={selectedProducts}
              onRemoveProduct={handleRemoveProduct}
              onAddProduct={handleAddProduct}
            />

            <ProjectDescriptionSection />

            <div className="mb-10">
              <button className="w-[573px] h-[47px] bg-black text-white flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-900 transition-colors font-medium">
                CONTINUE TO CHECKOUT
              </button>
            </div>
          </div>

          {/* Summary Section  */}
          <div className="md:col-span-1">
            <SummarySection
              productType={getProductType()}
              shotCount={selectedProducts.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
