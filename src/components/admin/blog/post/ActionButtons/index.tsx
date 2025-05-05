"use client";
import React from "react";

interface ActionButtonsProps {
  onSaveDraft: () => void;
  onPost: () => void;
  isCreatingPost: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSaveDraft,
  onPost,
  isCreatingPost,
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
        disabled={isCreatingPost}
        className="px-[18.5px] h-[32px] flex items-center justify-center bg-[#1D1D1B] uppercase text-sm font-semibold text-white rounded-full hover:bg-gray-800 cursor-pointer"
      >
        {isCreatingPost ? "Posting..." : "Post"}
      </button>
    </div>
  );
};

export default ActionButtons;
