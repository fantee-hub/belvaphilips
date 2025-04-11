import React from "react";
import { ArrowRight } from "lucide-react";

interface OptionCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonStyle?: "primary" | "secondary";
  onClick: () => void;
  showError?: boolean;
  children: React.ReactNode;
}

export default function OptionCard({
  title,
  description,
  buttonText,
  buttonStyle = "secondary",
  onClick,
  children,
  showError,
}: OptionCardProps) {
  return (
    <div className="space-y-4 relative">
      {showError && title === "GET A QUICK QUOTE" && (
        <div className="absolute -top-5 left-0 text-[#CF3131] text-[12px] ">
          Select your product type and shoot type
        </div>
      )}

      <div
        className={`bg-[#F5F5F5] relative overflow-hidden  h-[153px] ${
          title === "FILL A BRIEF" ? "border-[0.5px] border-[#C9C9C9]" : ""
        }`}
      >
        {children}
      </div>

      <div>
        <h3 className="font-semibold mb-2 text-lg leading-[125%] text-[#1D1D1B]">
          {title}
        </h3>
        <p className="text-[#1D1D1B] text-sm mb-4">{description}</p>

        <button
          onClick={onClick}
          className={`w-full h-[37px] rounded-full flex items-center  justify-center space-x-2 text-[13px] cursor-pointer font-semibold ${
            buttonStyle === "primary"
              ? "bg-black text-white"
              : "border border-[#1D1D1B] text-[#1D1D1B]"
          }`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
