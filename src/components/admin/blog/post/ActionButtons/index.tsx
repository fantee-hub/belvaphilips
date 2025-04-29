"use client";
import React from "react";

interface ActionButtonsProps {
  onSaveDraft: () => void;
  onPost: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSaveDraft,
  onPost,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onSaveDraft}
        className="w-[145px] h-[32px] font-semibold uppercase text-sm flex items-center justify-center border border-[#1D1D1B] rounded-full hover:bg-gray-100 cursor-pointer"
      >
        SAVE TO DRAFTS
      </button>
      <button
        onClick={onPost}
        className="w-[76px] h-[32px] flex items-center justify-center bg-[#1D1D1B] uppercase text-sm font-semibold text-white rounded-full hover:bg-gray-800 cursor-pointer"
      >
        POST
      </button>
    </div>
  );
};

export default ActionButtons;
