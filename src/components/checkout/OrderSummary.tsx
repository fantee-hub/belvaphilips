"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface OrderSummaryProps {
  orderDetails: any;
  selectedDeliveryType: string;
  onUpgrade: () => void;
}

export default function OrderSummary({
  orderDetails,
  selectedDeliveryType,
  onUpgrade,
}: OrderSummaryProps) {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  // Calculate total price
  const totalPrice =
    (orderDetails.basePrice || 0) * (orderDetails.quantity || 1);

  return (
    <div className="sticky top-20">
      {/* Summary Card */}
      <div className="border border-black mb-4 -mx-4 md:mx-0">
        <div className="p-5 bg-[#F0F0F0] px-4 md:p-5">
          <div
            className="flex justify-between items-center mb-4"
            onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
          >
            <h2 className="text-[20px] font-bold">SUMMARY</h2>
            <button className="md:hidden flex items-center gap-2 text-[#444444] text-sm font-medium">
              <svg
                className={`h-5 w-5 transition-transform duration-300 ${
                  isSummaryExpanded ? "rotate-180" : ""
                }`}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0233 10.8517L9.39828 5.22672C9.34604 5.17442 9.284 5.13293 9.21572 5.10462C9.14743 5.07631 9.07423 5.06175 9.00031 5.06175C8.92639 5.06175 8.8532 5.07631 8.78491 5.10462C8.71662 5.13293 8.65458 5.17442 8.60234 5.22672L2.97734 10.8517C2.8718 10.9573 2.8125 11.1004 2.8125 11.2497C2.8125 11.399 2.8718 11.5421 2.97734 11.6477C3.08289 11.7532 3.22605 11.8125 3.37531 11.8125C3.52458 11.8125 3.66773 11.7532 3.77328 11.6477L9.00031 6.41992L14.2273 11.6477C14.2796 11.6999 14.3417 11.7414 14.4099 11.7697C14.4782 11.7979 14.5514 11.8125 14.6253 11.8125C14.6992 11.8125 14.7724 11.7979 14.8407 11.7697C14.909 11.7414 14.971 11.6999 15.0233 11.6477C15.0755 11.5954 15.117 11.5334 15.1453 11.4651C15.1736 11.3968 15.1881 11.3236 15.1881 11.2497C15.1881 11.1758 15.1736 11.1026 15.1453 11.0343C15.117 10.966 15.0755 10.904 15.0233 10.8517Z"
                  fill="#444444"
                />
              </svg>
            </button>
          </div>

          {/* Collapsible Content on Mobile */}
          <AnimatePresence>
            {(isSummaryExpanded || window.innerWidth >= 768) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex justify-between font-semibold">
                    <span>Product</span>
                    <span className="capitalize">
                      {orderDetails.category?.toLowerCase() || "Clothing"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shoot type</span>
                    <span className="font-medium capitalize">
                      {orderDetails.shootType?.toLowerCase() || "Flatlay"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Finish Type</span>
                    <span className="font-medium capitalize">
                      {orderDetails.finish?.toLowerCase() || "Basic End Finish"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Image Quantity</span>
                    <span className="font-medium">
                      x{orderDetails.quantity || 1}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold mb-2">Scene:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Backdrop</span>
                        <span className="font-medium">White</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Items in frame</span>
                        <span className="font-medium">Single</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shadow</span>
                        <span className="font-medium">No Shadow</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-between">
                    <h3 className="font-semibold mb-2">Shots:</h3>
                    <div className="flex flex-col gap-1 text-right">
                      {orderDetails.selectedShots?.map(
                        (shot: string, index: number) => (
                          <div key={index}>
                            <span className="font-medium capitalize">
                              {shot.toLowerCase()} Shot
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-between">
                    <h3 className="font-semibold mb-2">Delivery</h3>
                    <span className="font-medium capitalize">
                      {selectedDeliveryType}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Membership Upgrade */}
      <div
        className="py-[7px] border-[0.5px] border-[#1D1D1B] pl-3 md:pr-5 pr-3 -mx-4 md:mx-0"
        style={{
          background:
            "linear-gradient(to right, #FFFFFF 30%, #E7E7E7 85%, #DEDEDE 100%)",
        }}
      >
        <div className="flex justify-between items-center w-full gap-3 md:gap-0">
          <span className="font-semibold text-[#1D1D1B] text-sm md:text-base">
            Upgrade your membership in order to save up to 25%!
          </span>
          <button
            onClick={onUpgrade}
            className="bg-black text-white md:h-[38px] h-[32px] md:w-[106px] px-3 md:px-0 flex items-center justify-center text-sm font-semibold uppercase rounded-full"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
