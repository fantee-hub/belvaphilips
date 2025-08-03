"use client";
import Image from "next/image";
import React from "react";
import { toast } from "react-hot-toast";

interface CoverImageUploadProps {
  coverImage: File | null;
  coverImageUrl?: string;
  setCoverImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({
  coverImage,
  coverImageUrl,
  setCoverImage,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setCoverImage(file);
    } else {
      toast.error("Please upload a PNG or JPG image", {
        style: {
          border: "0.5px solid #1D1D1B",
          padding: "16px",
          color: "#1D1D1B",
          borderRadius: "6px",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  return (
    <div className="md:w-[373px] md:h-[571px] w-full h-[152px]  border border-dashed border-[#C9C9C9] rounded-[16px] flex flex-col items-center justify-center relative overflow-hidden ">
      {coverImage || coverImageUrl ? (
        <img
          src={coverImage ? URL.createObjectURL(coverImage) : coverImageUrl}
          alt="Cover"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <>
          <div className="text-2xl text-gray-500 mb-2">
            <Image
              src="/assets/images/image-icon.svg"
              alt="Upload"
              width={36}
              height={36}
            />
          </div>
          <p className="text-sm text-[#444444]">Upload a cover image</p>
          <p className="text-xs text-[#444444] mt-1">
            Drag and drop or{" "}
            <span className="font-semibold text-[#C49524]">
              Click to upload
            </span>
          </p>
          <p className="text-xs text-[#787878] mt-1">PNG and JPG supported</p>
        </>
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />
    </div>
  );
};

export default CoverImageUpload;
