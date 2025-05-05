"use client";
import React, { useState } from "react";
import { PiLinkSimple } from "react-icons/pi";
import { HiPaperClip } from "react-icons/hi2";
import { IoImageOutline } from "react-icons/io5";
import { GoBold } from "react-icons/go";
import { FiItalic } from "react-icons/fi";
import { HiMiniListBullet } from "react-icons/hi2";
import { PiListNumbers } from "react-icons/pi";
import { IoText } from "react-icons/io5";
import { PiCaretDown } from "react-icons/pi";
import ActionButtons from "../ActionButtons";

interface EditorToolbarProps {
  handleFormat: (format: string, param?: string) => void;
  onSaveDraft: () => void;
  onPost: () => void;
  isCreatingPost: boolean;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  handleFormat,
  onSaveDraft,
  onPost,
  isCreatingPost,
}) => {
  const [fontSize, setFontSize] = useState<string>("Medium");
  const [showFontSizes, setShowFontSizes] = useState<boolean>(false);

  const handleFontSizeChange = (size: string): void => {
    setFontSize(size);
    handleFormat("fontSize", size);
    setShowFontSizes(false);
  };

  return (
    <div className="px-4 py-2 bg-white rounded-b-[16px] border-[0.5px] border-[#C9C9C9] absolute bottom-0 w-full flex justify-between items-center">
      <div className="flex items-center space-x-5 ">
        <button
          onClick={() => handleFormat("attachment")}
          className="p-1 hover:bg-gray-200 rounded text-[20px] cursor-pointer"
          title="Add attachment"
        >
          <HiPaperClip />
        </button>
        <button
          onClick={() => handleFormat("image")}
          className="p-1 hover:bg-gray-200 rounded text-[20px] cursor-pointer"
          title="Insert image"
        >
          <IoImageOutline />
        </button>
        <button
          onClick={() => handleFormat("bold")}
          className="p-1 hover:bg-gray-200 rounded font-bold text-[20px] cursor-pointer"
          title="Bold"
        >
          <GoBold />
        </button>
        <button
          onClick={() => handleFormat("italic")}
          className="p-1 hover:bg-gray-200 rounded italic text-[20px] cursor-pointer"
          title="Italic"
        >
          <FiItalic />
        </button>
        <button
          onClick={() => handleFormat("bulletList")}
          className="p-1 hover:bg-gray-200 rounded text-[20px] cursor-pointer"
          title="Bullet list"
        >
          <HiMiniListBullet />
        </button>
        <button
          onClick={() => handleFormat("numberedList")}
          className="p-1 hover:bg-gray-200 rounded text-[20px] cursor-pointer"
          title="Numbered list"
        >
          <PiListNumbers />
        </button>
        <button
          onClick={() => handleFormat("link")}
          className="p-1 hover:bg-gray-200 rounded text-[20px] cursor-pointer"
          title="Insert link"
        >
          <PiLinkSimple />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowFontSizes(!showFontSizes)}
            className="p-1 hover:bg-gray-200 rounded flex items-center cursor-pointer text-[20px]"
            title="Font size"
          >
            <span className="w-[29px] h-[29px] flex items-center justify-center rounded-full bg-[#F0F0F0] text-[#444444]">
              <IoText />
            </span>
            <span className="text-[#6E6E6E]">
              <PiCaretDown />
            </span>
          </button>
          {showFontSizes && (
            <div className="absolute  bg-white border border-gray-300 rounded shadow-lg z-10">
              <button
                onClick={() => handleFontSizeChange("Small")}
                className="block w-full text-left px-4 py-1 hover:bg-gray-100 text-xs"
              >
                Small
              </button>
              <button
                onClick={() => handleFontSizeChange("Medium")}
                className="block w-full text-left px-4 py-1 hover:bg-gray-100 font-medium text-sm"
              >
                Medium
              </button>
              <button
                onClick={() => handleFontSizeChange("Large")}
                className="block w-full text-left px-4 py-1 hover:bg-gray-100 text-base font-bold"
              >
                Large
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => handleFormat("underline")}
          className="p-1 hover:bg-gray-200 rounded underline cursor-pointer text-[20px]"
          title="Underline"
        >
          U
        </button>
      </div>
      <ActionButtons
        onSaveDraft={onSaveDraft}
        onPost={onPost}
        isCreatingPost={isCreatingPost}
      />
    </div>
  );
};

export default EditorToolbar;
