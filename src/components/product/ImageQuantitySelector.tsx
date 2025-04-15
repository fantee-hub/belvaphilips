import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface ImageQuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number) => void;
  min?: number;
  max?: number;
}

const ImageQuantitySelector = ({
  quantity,
  setQuantity,
  min = 1,
  max = 100,
}: ImageQuantitySelectorProps) => {
  const handleDecrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border-b border-[#D1D1D1] pb-8">
      <motion.button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`
          w-[69.41px] h-[69.41px] rounded-full border-[0.5px] border-[#1D1D1B] flex items-center justify-center cursor-pointer
          ${
            quantity <= min
              ? " cursor-not-allowed opacity-30"
              : "text-gray-700 hover:bg-gray-100"
          }
        `}
        whileHover={quantity > min ? { scale: 1.05 } : {}}
        whileTap={quantity > min ? { scale: 0.95 } : {}}
      >
        <Minus size={18} />
      </motion.button>

      <div className="mx-4 w-10 text-center">
        <input
          type="text"
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= min && value <= max) {
              setQuantity(value);
            }
          }}
          className="w-full text-center border-none text-xl focus:outline-none focus:ring-0"
        />
      </div>

      <motion.button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`
        w-[69.41px] h-[69.41px] rounded-full border-[0.5px] border-[#1D1D1B] flex items-center justify-center cursor-pointer
          ${
            quantity >= max
              ? " cursor-not-allowed opacity-30"
              : "text-gray-700 hover:bg-gray-100"
          }
        `}
        whileHover={quantity < max ? { scale: 1.05 } : {}}
        whileTap={quantity < max ? { scale: 0.95 } : {}}
      >
        <Plus size={18} />
      </motion.button>
    </div>
  );
};

export default ImageQuantitySelector;
