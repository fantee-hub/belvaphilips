"use client";
import React, { useState, useRef } from "react";
import { Editor } from "@tiptap/react";
import { GoBold, GoItalic } from "react-icons/go";
import { HiMiniListBullet } from "react-icons/hi2";
import { PiListNumbers, PiLinkSimple } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { FiItalic } from "react-icons/fi";
import { BsTypeUnderline } from "react-icons/bs";
import {
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiPalette } from "react-icons/bi";
import ActionButtons from "../ActionButtons";

interface EditorToolbarProps {
  editor: Editor | null;
  handleImageUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
  bucketExists?: boolean;
  onSaveDraft: () => void;
  onPost: () => void;
  isCreatingPost: boolean;
  isDrafting: boolean;
  isEditing?: boolean;
  onUpdate: () => Promise<void>;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  handleImageUpload,
  isUploading = false,
  bucketExists = true,
  onSaveDraft,
  onPost,
  isCreatingPost,
  isDrafting,
  onUpdate,
  isEditing = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");

  if (!editor) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
      // Reset the input value so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="md:px-4 px-2 py-2 bg-white rounded-b-[16px] border-[0.5px]  border-[#C9C9C9] w-full flex sm:flex-nowrap flex-wrap items-center justify-between gap-1">
      <div className="flex items-center flex-wrap gap-1 w-full flex-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Bold"
        >
          <GoBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Italic"
        >
          <FiItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Underline"
        >
          <BsTypeUnderline />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1 hidden md:block"></div>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Heading 1"
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Heading 2"
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive("heading", { level: 3 })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Heading 3"
        >
          H3
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1 hidden md:block"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Bullet list"
        >
          <HiMiniListBullet />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Numbered list"
        >
          <PiListNumbers />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1 hidden md:block"></div>

        {/* Text alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive({ textAlign: "left" })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Align left"
        >
          <MdFormatAlignLeft />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Align center"
        >
          <MdFormatAlignCenter />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-1 rounded text-[20px] cursor-pointer ${
            editor.isActive({ textAlign: "right" })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Align right"
        >
          <MdFormatAlignRight />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1 hidden md:block"></div>

        {/* Color picker */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-1 hover:bg-gray-200 rounded text-[20px] cursor-pointer"
            title="Text color"
            style={{ color: currentColor }}
          >
            <BiPalette />
          </button>

          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 z-10 bg-white shadow-lg rounded p-2">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => {
                  const color = e.target.value;
                  setCurrentColor(color);
                  editor.chain().focus().setColor(color).run();
                }}
                className="w-8 h-8 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Image upload */}
        <div className="relative">
          <button
            onClick={() => bucketExists && fileInputRef.current?.click()}
            className={`p-1 rounded text-[20px] cursor-pointer ${
              !bucketExists || isUploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            disabled={!bucketExists || isUploading}
            title={
              !bucketExists
                ? "Storage bucket not found. Create 'blog-content-images' in Supabase"
                : "Insert image"
            }
          >
            {isUploading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <IoImageOutline />
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={!bucketExists || isUploading}
          />
        </div>
      </div>

      <div className="sm:block hidden flex-1">
        <ActionButtons
          onSaveDraft={onSaveDraft}
          onPost={onPost}
          isCreatingPost={isCreatingPost}
          isDrafting={isDrafting}
          isEditing={isEditing}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  );
};

export default EditorToolbar;
