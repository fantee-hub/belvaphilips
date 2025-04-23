"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FinishSelector from "./FinishSelector";
import ShootTypeSelector from "./ShootTypeSelector";
import ImageQuantitySelector from "./ImageQuantitySelector";
import MembershipPlans from "./MembershipPlans";
import RelatedCategories from "./RelatedCategories";
import OrderSummary from "./OrderSummary";
import Accordion from "./Accordion";
import {
  getProductsByTypeAndShoot,
  getProductsByTypeAndShootAndFinish,
} from "@/lib/mockData/portfolioData";
import { GoArrowRight } from "react-icons/go";
import FAQSection from "../home/FAQSection";
import Link from "next/link";

interface ProductConfigProps {
  category?: string;
  shootType?: string;
}

const ProductConfigurationPage = ({
  category = "CLOTHING",
  shootType = "FLATLAY",
}: ProductConfigProps) => {
  const [selectedFinish, setSelectedFinish] = useState("BASIC END FINISH");
  const [selectedShootType, setSelectedShootType] = useState(shootType);
  const [quantity, setQuantity] = useState(1);
  const [basePrice, setBasePrice] = useState(25000);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (selectedShootType === "MODEL") {
      setSelectedFinish("MEDIUM END FINISH");
    } else if (
      category === "CLOTHING" &&
      ["GHOST", "PINNED"].includes(selectedShootType)
    ) {
      setSelectedFinish("MEDIUM END FINISH");
    } else {
      setSelectedFinish("BASIC END FINISH");
    }
  }, [category, selectedShootType]);

  useEffect(() => {
    switch (selectedFinish) {
      case "BASIC END FINISH":
        setBasePrice(25000);
        break;
      case "MEDIUM END FINISH":
        setBasePrice(45000);
        break;
      case "HIGH END FINISH":
        setBasePrice(65000);
        break;
      case "PREMIUM END FINISH":
        setBasePrice(150000);
        break;
      default:
        setBasePrice(25000);
    }
  }, [selectedFinish]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedShootType, selectedFinish]);

  // Filter products based on the selected category, shoot type, and finish
  const filteredProducts = useMemo(() => {
    return getProductsByTypeAndShootAndFinish(
      category,
      selectedShootType,
      selectedFinish
    );
  }, [category, selectedShootType, selectedFinish]);

  // Get product images for the current category, shoot type, and finish
  const productImages = useMemo(() => {
    if (filteredProducts.length === 0) {
      return [];
    }
    return filteredProducts.slice(0, 4).map((product) => product.image);
  }, [filteredProducts]);

  return (
    <div className="pt-[60px]">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-6">
          <motion.div
            className="flex items-center text-sm gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[#AAAAAA] font-medium">{category}</span>
            <span>
              <GoArrowRight />
            </span>
            <span className="text-[#1D1D1B] font-bold">{shootType}</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left column - Product Image */}
          <div>
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-[14px] mb-4">
              {productImages.length > 0
                ? productImages.map((img, index) => (
                    <div
                      key={index}
                      className={`border  cursor-pointer transition-all duration-200 hover:border-gray-500 overflow-hidden ${
                        index === selectedImageIndex
                          ? "border-gray-800"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <div className="w-[141px] h-[197px] relative bg-white flex items-center justify-center">
                        <Image
                          src={img}
                          alt={`Product thumbnail ${index + 1}`}
                          width={141}
                          height={197}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))
                : Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="border p-1 border-gray-200">
                        <div className="aspect-square bg-gray-200"></div>
                      </div>
                    ))}
            </div>

            {/* Main Product Image */}
            <motion.div
              className="aspect-square bg-white relative"
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {productImages.length > 0 &&
              selectedImageIndex < productImages.length ? (
                <Image
                  src={productImages[selectedImageIndex]}
                  alt={`${category} ${shootType} photography`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No preview available
                </div>
              )}
            </motion.div>
          </div>

          {/* Right column - Configuration Options */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Tag */}
              <div className="mb-4">
                <span className="flex items-center justify-center w-[137px] h-[35px] py-[14px] px-[11px] rounded-full border border-[#1D1D1B] text-lg font-medium">
                  {shootType}
                </span>
              </div>

              {/* Category Title */}
              <h1 className="text-[52px] leading-[110%] font-bold mb-2">
                {category} <br /> PHOTOGRAPHY
              </h1>

              {/* Description */}
              <p className="text-[#444444] mb-6 leading-[155%]">
                Flat lay photography captures clothing from a top-down view,
                laid flat on a surface.
              </p>

              {/* Finish Selection */}
              <div className="mb-7 border-t border-b border-[#D1D1D1] pt-7 pb-8">
                <h2 className="font-semibold mb-2 leading-[155%] text-lg">
                  CHOOSE YOUR PREFERRED FINISH
                </h2>
                <p className="text-gray-600 mb-5">
                  Select the quality and style that best suits your brand's
                  needs.
                </p>
                <FinishSelector
                  selectedFinish={selectedFinish}
                  onSelectFinish={setSelectedFinish}
                  category={category}
                  shootType={selectedShootType}
                />
              </div>

              {/* Shoot Type */}
              <div className="mb-7">
                <h2 className="font-semibold mb-2 text-lg leading-[155%]">
                  SHOOT TYPE
                </h2>
                <p className="text-[#444444] mb-4">
                  Select the best way to showcase your product to match your
                  brand's needs.
                </p>
                <ShootTypeSelector
                  category={category}
                  selectedType={selectedShootType}
                  onSelectType={setSelectedShootType}
                />
              </div>

              {/* Image Quantity */}
              <div className="mb-7">
                <h2 className="font-semibold mb-2 text-lg leading-[155%]">
                  IMAGE QUANTITY
                </h2>
                <p className="text-[#444444] mb-4">
                  Input the number of shots you would like
                </p>
                <ImageQuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </div>

              {/* Membership Plans */}
              <div className="mb-8">
                <h2 className="font-semibold mb-2 text-lg leading-[155%]">
                  MEMBERSHIP PLANS
                </h2>
                <p className="text-[#444444] mb-4">
                  Enjoy flexible options tailored to your needs. Save more with
                  higher volume and get exclusive perks with our membership
                  plans.
                </p>
                <MembershipPlans />
              </div>

              {/* Order Summary */}
              <OrderSummary
                basePrice={basePrice}
                quantity={quantity}
                selectedFinish={selectedFinish}
                selectedShootType={selectedShootType}
                category={category}
              />

              {/* What's Included */}
              <div className="mt-8">
                <Accordion
                  title="WHAT'S INCLUDED IN THIS SERVICE?"
                  content={
                    <>
                      Standard product photos delivered as high-resolution JPG
                      files (300 DPI).
                      <br />
                      <br />
                      Standard retouching included for every image.
                      <br />
                      <br />
                      One round of revisions based on Belvaphilips’ feedback
                      process.
                      <br />
                      <br />
                      Turnaround starts the next business day after payment is
                      made.
                      <br />
                      <br />
                      Online-only collaboration; in-person attendance during
                      shoots is not available.
                    </>
                  }
                />
              </div>

              {/* Need Assistance */}
              <div className="mt-5 flex justify-between items-center border-t border-gray-200 pt-4">
                <div>
                  <h3 className="font-semibold leading-[155%]">
                    CONFUSED OR NEED ASSISTANCE?
                  </h3>
                  <p className="text-sm text-[#444444]">
                    Book a quick call with us
                  </p>
                </div>
                <button className="border border-[#1D1D1B] w-[126px] h-[38px] flex items-center justify-center cursor-pointer rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors">
                  BOOK A CALL
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Categories */}
        <div className="mt-[176px] mb-[100px]">
          <div className="flex">
            <h2 className="text-[64px] font-semibold mb-8 leading-[115%] tracking-[-3px] w-full">
              YOU MIGHT PREFER <br /> THESE
            </h2>
            <div className="flex justify-end w-full mt-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center text-gray-800 hover:text-black cursor-pointer"
              >
                <Link
                  href="/portfolio"
                  className="flex items-center border-[0.5px] w-[287px] h-[55px] justify-center border-[#C9C9C9] gap-4"
                >
                  <span className="font-medium">VIEW ALL OUR SERVICES</span>
                  <svg
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0306 0.219445L17.7806 6.96945C17.8504 7.0391 17.9057 7.12182 17.9434 7.21287C17.9812 7.30391 18.0006 7.40151 18.0006 7.50007C18.0006 7.59863 17.9812 7.69623 17.9434 7.78728C17.9057 7.87832 17.8504 7.96104 17.7806 8.0307L11.0306 14.7807C10.8899 14.9214 10.699 15.0005 10.5 15.0005C10.301 15.0005 10.1101 14.9214 9.96937 14.7807C9.82864 14.64 9.74958 14.4491 9.74958 14.2501C9.74958 14.051 9.82864 13.8602 9.96937 13.7194L15.4397 8.25007L0.75 8.25007C0.551087 8.25007 0.360322 8.17105 0.21967 8.0304C0.0790175 7.88975 -3.19159e-07 7.69898 -3.27854e-07 7.50007C-3.36548e-07 7.30116 0.0790174 7.11039 0.21967 6.96974C0.360322 6.82909 0.551087 6.75007 0.75 6.75007L15.4397 6.75007L9.96937 1.2807C9.82864 1.13996 9.74958 0.949093 9.74958 0.75007C9.74958 0.551047 9.82864 0.360176 9.96937 0.219445C10.1101 0.0787139 10.301 -0.000347588 10.5 -0.000347596C10.699 -0.000347605 10.8899 0.0787139 11.0306 0.219445Z"
                      fill="#1D1D1B"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>

          <RelatedCategories />
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
};

export default ProductConfigurationPage;
