"use client";
import React from "react";

interface ActionButtonsProps {
  onSaveDraft: () => void;
  onPost: () => void;
  isCreatingPost: boolean;
  isDrafting: boolean;
  isEditing?: boolean;
  onUpdate: () => Promise<void>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSaveDraft,
  onPost,
  isCreatingPost,
  isDrafting,
  isEditing,
  onUpdate,
}) => {
  return (
    <>
      {!isEditing && (
        <div className="flex items-center space-x-2">
          <button
            onClick={onSaveDraft}
            disabled={isDrafting}
            className="w-[145px] h-[32px] font-semibold uppercase text-sm flex items-center justify-center border border-[#1D1D1B] rounded-full hover:bg-gray-100 cursor-pointer"
          >
            {isDrafting ? "Saving..." : "Save to Drafts"}
          </button>
          <button
            onClick={onPost}
            disabled={isCreatingPost}
            className="px-[18.5px] h-[32px] flex items-center justify-center bg-[#1D1D1B] uppercase text-sm font-semibold text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            {isCreatingPost ? "Posting..." : "Post"}
          </button>
        </div>
      )}

      {isEditing && (
        <div className="md:w-full md:flex md:justify-end">
          <button
            onClick={onUpdate}
            disabled={isCreatingPost}
            className="px-[18.5px] h-[32px] flex items-center justify-center bg-[#1D1D1B] uppercase text-sm font-semibold text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            {isCreatingPost ? "Updating Post..." : "Edit"}
          </button>
        </div>
      )}
    </>
  );
};

export default ActionButtons;
