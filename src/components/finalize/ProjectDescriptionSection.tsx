"use client";

import { useState } from "react";
import { PaperclipIcon } from "lucide-react";

export default function ProjectDescriptionSection() {
  const [selectedShootType, setSelectedShootType] =
    useState<string>("Studio Shot");
  const shootTypes = ["Studio Shot", "Lifestyle Shot", "Dramatic Lighting"];

  return (
    <div className="mb-5">
      <h2 className="text-[28px] font-semibold text-[#1D1D1B] mb-2 leading-[110%]">
        PROJECT DESCRIPTION <span className="text-red-500">*</span>
      </h2>
      <p className="text-gray-600 mb-4 max-w-[516px] text-[#444444] leading-[155%]">
        Share details, creative direction, and any reference images to help us
        bring your project to life.
      </p>

      <div className="relative">
        <textarea
          className="w-full border-[0.7px] border-[#C9C9C9] p-4 h-[204px] mb-4 focus:outline-none focus:ring-1 placeholder:text-[#B9B9B9] focus:ring-gray-200"
          placeholder="Example: Clean white background, soft shadows, lifestyle setting."
        />

        <div className="flex flex-wrap gap-3 mb-4 absolute bottom-6 left-5">
          {shootTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedShootType(type)}
              className={`px-[10px] py-1 border rounded-full text-sm font-medium text-[#1D1D1B] cursor-pointer ${
                selectedShootType === type
                  ? "border-black bg-white"
                  : "border-[#C9C9C9] border-[0.5px]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <button className="border border-[#1D1D1B] font-semibold rounded-full w-[196px] h-[37px] text-sm flex items-center justify-center cursor-pointer">
        ATTACH FILE/IMAGE
        <PaperclipIcon className="h-4 w-4 ml-2" />
      </button>
    </div>
  );
}
