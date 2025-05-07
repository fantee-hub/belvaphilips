"use client";
import React, { useState } from "react";
import EditorToolbar from "../EditorToolBar";

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
}) => {
  const [fontSizeClass, setFontSizeClass] = useState<string>("text-base");

  const handleFormat = (format: string, param?: string): void => {
    const textarea = document.getElementById(
      "blog-content"
    ) as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = selectedText;
    let insertText = "";
    let newPosition = end;

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        newPosition = selectedText ? end + 4 : start + 2;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        newPosition = selectedText ? end + 2 : start + 1;
        break;
      case "underline":
        formattedText = `<u>${selectedText}</u>`;
        newPosition = selectedText ? end + 7 : start + 3;
        break;
      case "bulletList":
        if (selectedText) {
          const lines = selectedText.split("\n");
          formattedText = lines.map((line) => `- ${line}`).join("\n");
        } else {
          insertText = "- ";
          formattedText = "";
          newPosition = start + 2;
        }
        break;
      case "numberedList":
        if (selectedText) {
          const lines = selectedText.split("\n");
          formattedText = lines
            .map((line, index) => `${index + 1}. ${line}`)
            .join("\n");
        } else {
          insertText = "1. ";
          formattedText = "";
          newPosition = start + 3;
        }
        break;
      case "link":
        if (selectedText) {
          formattedText = `[${selectedText}](url)`;
          newPosition = end + 6;
        } else {
          formattedText = `[Link text](url)`;
          newPosition = start + 1;
        }
        break;
      case "image":
        formattedText = selectedText
          ? `![${selectedText}](image-url)`
          : `![Image description](image-url)`;
        newPosition = selectedText ? end + 12 : start + 18;
        break;
      case "attachment":
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = (e) => {
          const target = e.target as HTMLInputElement;
          if (target.files && target.files[0]) {
            const file = target.files[0];
            // Here you would typically upload the file and get a URL

            const placeholderText = `[File: ${file.name}](file-url)`;
            handleInsertText(placeholderText, start);
          }
        };
        input.click();
        return;
      case "fontSize":
        if (param === "Small") setFontSizeClass("text-sm");
        else if (param === "Medium") setFontSizeClass("text-base");
        else if (param === "Large") setFontSizeClass("text-lg");
        return;
    }

    const newContent =
      content.substring(0, start) +
      insertText +
      formattedText +
      content.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleInsertText = (text: string, position: number) => {
    const newContent =
      content.substring(0, position) + text + content.substring(position);
    setContent(newContent);

    setTimeout(() => {
      const textarea = document.getElementById(
        "blog-content"
      ) as HTMLTextAreaElement;
      textarea.focus();
      const newPosition = position + text.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
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
          className="w-full h-[47px] px-5  bg-[#F4F4F4] rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-[#585858]"
        />
        <p className="text-sm text-[#585858] text-right mt-1">
          Maximum characters: 120
        </p>
      </div>
      <div className="flex items-center  relative">
        <input
          type="text"
          placeholder="Generate a slug"
          value={slug}
          readOnly
          className="w-full px-5 h-[47px] bg-[#F4F4F4] outline-none rounded-full placeholder:text-[#585858]"
        />
        <button
          onClick={handleGenerateSlug}
          className="w-[93px] h-[26px] flex items-center cursor-pointer justify-center text-sm uppercase font-medium bg-black text-white rounded-full hover:bg-gray-800 absolute right-5 "
        >
          GENERATE
        </button>
      </div>
      <div className="relative">
        <textarea
          id="blog-content"
          placeholder="Enter your blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full h-[483px] px-5 pt-4 pb-14 border-[0.5px] border-[#C9C9C9] bg-[#F4F4F4] rounded-[16px] outline-none placeholder:text-[#585858] ${fontSizeClass} `}
        />
        <EditorToolbar
          handleFormat={handleFormat}
          onSaveDraft={onSaveDraft}
          onPost={onPost}
          isCreatingPost={isCreatingPost}
          isDrafting={isDrafting}
        />
      </div>
    </div>
  );
};

export default BlogEditor;
