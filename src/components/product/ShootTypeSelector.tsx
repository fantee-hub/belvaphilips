import { shootTypes } from "@/lib/mockData/portfolioData";
import { motion } from "framer-motion";

interface ShootTypeSelectorProps {
  category: string;
  selectedType: string;
  onSelectType: (type: string) => void;
}

const ShootTypeSelector = ({
  category,
  selectedType,
  onSelectType,
}: ShootTypeSelectorProps) => {
  // Get available shoot types based on selected category
  const availableTypes = shootTypes[category as keyof typeof shootTypes] || [];

  return (
    <div className="flex flex-wrap gap-2 border-b pb-8 border-[#D1D1D1]">
      {availableTypes.map((type) => {
        const isSelected = selectedType === type;
        const isPopular = type === "FLATLAY" && category === "CLOTHING";

        return (
          <motion.div
            key={type}
            onClick={() => onSelectType(type)}
            className={`
              cursor-pointer rounded-full px-[10px] py-1 text-sm flex items-center gap-1 font-medium
              ${
                isSelected
                  ? "bg-[#D3D3D3] border border-[#1D1D1B]"
                  : "border-[0.5px] border-[#C9C9C9] hover:border-gray-400"
              }
              ${isPopular ? "relative" : ""}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-1">
              <span>{type}</span>
              {isPopular && (
                <span className="ml-0 font-medium text-sm text-[#D63131]  px-2 py-0.5 rounded-full">
                  POPULAR!
                </span>
              )}
            </div>
            {isSelected && type === "MODEL" && (
              <span className="block text-xs text-[#787878] ">
                (MEDIUM END FINISH)
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ShootTypeSelector;
