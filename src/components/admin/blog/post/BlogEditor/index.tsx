"use client";
import React, { useState, useEffect } from "react";
import { EditorContent } from "@tiptap/react";

import { uploadImage } from "@/lib/api";
import Cookies from "universal-cookie";

import ActionButtons from "../ActionButtons";
import EditorToolbar from "../EditorToolBar";
import setAuthToken from "@/lib/api/setAuthToken";
import { toast } from "react-hot-toast";

interface BlogEditorProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  slug: string;
  handleGenerateSlug: () => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSaveDraft: () => void;
  onPost: () => void;
  isCreatingPost: boolean;
  isDrafting: boolean;
  editor: any;
  isEditing?: boolean;
  onUpdate: () => Promise<void>;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  title,
  setTitle,
  slug,
  handleGenerateSlug,
  content,
  setContent,
  onSaveDraft,
  onPost,
  isCreatingPost,
  isDrafting,
  editor,
  isEditing,
  onUpdate,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const cookies = new Cookies();

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    const token = cookies.get("admin_token");

    if (token) {
      setAuthToken(token);
    }

    const formData = new FormData();

    formData.append("post_id", slug);
    if (file) {
      formData.append("image", file);
    }

    console.log(file);
    try {
      const { data } = await uploadImage(formData);

      if (!data) {
        throw new Error("Image upload failed");
      }

      console.log(data.data);

      const imageUrl = data.data.image_url;

      if (editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    } catch (error: any) {
      console.error("Image upload failed:", error);
      toast.error(
        `Failed to upload image: ${error.message || "Unknown error"}`,
        {
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
        }
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Enter your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          className="w-full h-[47px] px-5 bg-[#F4F4F4] rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#585858]"
        />
        <p className="text-sm text-[#585858] text-right mt-1">
          Maximum characters: 120
        </p>
      </div>
      <div className="flex items-center relative">
        <input
          type="text"
          placeholder="Generate a slug"
          value={slug}
          readOnly
          className="w-full px-5 sm:h-[47px] h-[78px] bg-[#F4F4F4] outline-none sm:rounded-full rounded-[14px] placeholder:text-[#585858]"
        />
        <button
          onClick={handleGenerateSlug}
          className="w-[93px] h-[26px] flex items-center cursor-pointer justify-center text-sm uppercase font-medium bg-black text-white rounded-full hover:bg-gray-800 absolute right-5"
        >
          GENERATE
        </button>
      </div>
      <div className="relative">
        <div className="bg-[#F4F4F4] rounded-[16px] rounded-b-none">
          <EditorContent
            editor={editor}
            className="min-h-[483px] outline-none"
          />
        </div>
        <EditorToolbar
          editor={editor}
          handleImageUpload={handleImageUpload}
          isUploading={isUploading}
          bucketExists={true}
          onSaveDraft={onSaveDraft}
          onPost={onPost}
          isCreatingPost={isCreatingPost}
          isDrafting={isDrafting}
          isEditing={isEditing}
          onUpdate={onUpdate}
        />
        <div className="sm:hidden block mt-5">
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
    </div>
  );
};

export default BlogEditor;
