import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/mockData";

const shootTypes = [
  "Product Only",
  "Lifestyle",
  "Model",
  "Flatlay",
  "Creative",
  "360°",
];

interface ProductShootSelectorProps {
  onProductChange: (product: string | null) => void;
  onShootTypeChange: (shootType: string | null) => void;
  productError: boolean;
  shootTypeError: boolean;
  showError: boolean;
}

export default function ProductShootSelector({
  onProductChange,
  onShootTypeChange,
  productError,
  shootTypeError,
  showError,
}: ProductShootSelectorProps) {
  const [productOpen, setProductOpen] = useState(false);
  const [shootTypeOpen, setShootTypeOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedShootType, setSelectedShootType] = useState<string | null>(
    null
  );

  const handleProductSelect = (product: string) => {
    setSelectedProduct(product);
    onProductChange(product);
    setProductOpen(false);
  };

  const handleShootTypeSelect = (type: string) => {
    setSelectedShootType(type);
    onShootTypeChange(type);
    setShootTypeOpen(false);
  };

  return (
    <div className="space-y-4 pt-1">
      {/* Product Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setProductOpen(!productOpen)}
          className={`w-full h-[41.18px] flex gap-5 cursor-pointer justify-between px-[17.52px] items-center text-sm  rounded-full appearance-none ${
            showError
              ? "border-[0.44px] border-[#CF3131] text-[#CF3131] font-medium"
              : "border-[0.44px] border-[#C9C9C9] text-[#585858]"
          }`}
        >
          <span>
            {selectedProduct ? (
              <span className="capitalize">{selectedProduct}</span>
            ) : (
              "Select a product"
            )}
          </span>

          <ChevronDown
            className={`h-5 w-5 ${showError ? "text-[#CF3131]" : "text-dark"}`}
          />
        </button>

        {productOpen && (
          <div className="fixed w-[184px] z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-md">
            <div className="py-1 max-h-60 overflow-auto scrollbar-hide">
              {categories
                .filter((c) => c !== "ALL")
                .map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
                    onClick={() => handleProductSelect(category.toLowerCase())}
                  >
                    {category.toLowerCase()}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Shoot Type Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShootTypeOpen(!shootTypeOpen)}
          className={`w-full h-[41.18px] flex gap-5 cursor-pointer justify-between px-[17.52px] items-center text-sm  rounded-full appearance-none ${
            showError
              ? "border-[0.44px] border-[#CF3131] text-[#CF3131] font-medium"
              : "border-[0.44px] border-[#C9C9C9] text-[#585858]"
          }`}
        >
          <span>{selectedShootType || "Select shoot type"}</span>
          <ChevronDown
            className={`h-5 w-5 ${showError ? "text-[#CF3131]" : "text-dark"}`}
          />
        </button>

        {shootTypeOpen && (
          <div className="fixed z-50 mt-1 w-[184px] bg-white  border border-gray-200 rounded-md shadow-md">
            <div className="py-1 max-h-60 overflow-auto scrollbar-hide">
              {shootTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleShootTypeSelect(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
