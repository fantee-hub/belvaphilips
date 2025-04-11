import { motion } from "framer-motion";
import { Clock, Package, Check } from "lucide-react";
import Image from "next/image";

interface MembershipCardProps {
  title: string;
  description: string;
  price: string;
  savingsPercentage?: string;
  startingPrice?: string;
  imagesPerMonth?: string;
  turnaround: string;
  noHeader?: boolean;
  minimumOrder?: string;
  onGetStarted: () => void;
}

export default function MembershipCard({
  title,
  description,
  price,
  savingsPercentage,
  startingPrice,
  imagesPerMonth,
  turnaround,
  minimumOrder,
  onGetStarted,
  noHeader,
}: MembershipCardProps) {
  return (
    <motion.div
      className=" "
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {savingsPercentage && !noHeader && (
        <div className="bg-[#EEB52B] text-white py-1 text-sm text-center font-bold">
          {savingsPercentage}
        </div>
      )}

      {noHeader && (
        <div className="bg-transparent border-none text-center py-[14px]"></div>
      )}

      <div className="p-4 border border-gray-200 h-[95%] space-y-4">
        <div>
          <h3 className="text-[20px] font-medium mb-2">{title}</h3>
          <p className="text-[#444444]">{description}</p>
        </div>

        <div className="text-[22px] font-semibold ">{price}</div>

        <button
          onClick={onGetStarted}
          className="w-full bg-black text-white h-[46px] rounded-full flex items-center justify-center font-medium hover:bg-gray-900 transition-colors"
        >
          GET STARTED
        </button>

        <div className="space-y-3 text-sm pt-6">
          {savingsPercentage == "No image savings " && (
            <div className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Image
                  src="/assets/images/CurrencyCircleDollar.svg"
                  width={20}
                  height={20}
                  alt="CurrencyCircelDollar"
                />
              </span>
              <span className="text-[#787878] max-w-[221px]">
                {savingsPercentage}
                {startingPrice && (
                  <span>
                    {" "}
                    (Starts at{" "}
                    <span className="font-medium text-[#444444]">
                      {startingPrice}
                    </span>
                    )
                  </span>
                )}
              </span>
            </div>
          )}

          {imagesPerMonth && (
            <div className="flex start">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Image
                  src="/assets/images/gallery.svg"
                  width={20}
                  height={20}
                  alt="CurrencyCircelDollar"
                />
              </span>
              <span>{imagesPerMonth} Images per month</span>
            </div>
          )}

          <div className="flex items-start">
            <span className=" flex items-center justify-center mr-2">
              <Image
                src="/assets/images/Timer.svg"
                width={20}
                height={20}
                alt="CurrencyCircelDollar"
              />
            </span>
            <span>{turnaround} turnaround</span>
          </div>

          {minimumOrder && (
            <div className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Image
                  src="/assets/images/group-gallery.svg"
                  width={20}
                  height={20}
                  alt="CurrencyCircelDollar"
                />
              </span>
              <span>{minimumOrder}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
