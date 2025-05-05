"use client";
import Image from "next/image";
import React from "react";

interface CoverImageUploadProps {
  coverImage: File | null;
  setCoverImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({
  coverImage,
  setCoverImage,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setCoverImage(file);
    } else {
      alert("Please upload a PNG or JPG image.");
    }
  };

  return (
    <div className="w-[373px] h-[571px] border-1 border-dashed border-[#C9C9C9] rounded-[16px] flex flex-col items-center justify-center relative">
      {coverImage ? (
        <img
          src={URL.createObjectURL(coverImage)}
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
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            className="absolute w-64 h-64 opacity-0 cursor-pointer"
          />
        </>
      )}
    </div>
  );
};

export default CoverImageUpload;
