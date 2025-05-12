import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface OrderSummaryProps {
  basePrice: number;
  quantity: number;
  selectedFinish: string;
  selectedShootType: string;
  category: string;
  addOns?: Array<{
    name: string;
    price: number;
  }>;
  selectedMembershipPlan: string | null;
  videoConfig?: {
    videoType: string;
    animationPackage: string;
    videoStyle: string;
    videoQuantity: number;
  };
}

const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

const OrderSummary = ({
  basePrice,
  quantity,
  selectedFinish,
  selectedShootType,
  category,
  addOns = [],
  selectedMembershipPlan,
  videoConfig,
}: OrderSummaryProps) => {
  const router = useRouter();
  const subtotal =
    selectedShootType === "VIDEO"
      ? basePrice * (videoConfig?.videoQuantity || 1)
      : basePrice * quantity;

  const addOnsTotal = addOns.reduce((total, addon) => total + addon.price, 0);
  const total = subtotal + addOnsTotal;

  const handleFinalizeClick = () => {
    const config = {
      finish: selectedFinish,
      shootType: selectedShootType,
      quantity:
        selectedShootType === "VIDEO" ? videoConfig?.videoQuantity : quantity,
      basePrice,
      category,
      total,
      membershipPlan: selectedMembershipPlan,
      ...(selectedShootType === "VIDEO" &&
        videoConfig && {
          details: {
            "Video Type": videoConfig.videoType,
            "Animation Package": videoConfig.animationPackage,
            "Video Style": videoConfig.videoStyle,
          },
        }),
    };

    localStorage.setItem("productConfig", JSON.stringify(config));
    router.push("/finalize");
  };

  return (
    <div className="">
      <div className="bg-[#F0F0F0] border-[0.5px] border-[#1D1D1B]">
        <div className="p-5 space-y-3 pb-12">
          <div className="flex justify-between font-semibold text-lg">
            <span className="">
              Price Per {selectedShootType === "VIDEO" ? "Video" : "Image"}
            </span>
            <span>{formatCurrency(basePrice)}</span>
          </div>

          <div className="flex justify-between font-medium text-[#444444]">
            <span>
              {selectedShootType === "VIDEO" ? "Videos" : "Images"} Subtotal:
            </span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between -mt-1 font-medium text-[#444444]">
            <span>Add Ons:</span>
            <span>{addOns.length > 0 ? formatCurrency(addOnsTotal) : "-"}</span>
          </div>
        </div>

        <div className="p-5 bg-[#C7C7C7] flex justify-between font-semibold text-lg">
          <span>TOTAL</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <motion.button
        className="w-full bg-black text-white h-[47px] flex items-center justify-center mt-5 font-semibold rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleFinalizeClick}
      >
        CONTINUE TO FINALIZE
      </motion.button>
    </div>
  );
};

export default OrderSummary;
