"use client";
import ActionButtons from "@/components/admin/blog/post/ActionButtons";
import BlogEditor from "@/components/admin/blog/post/BlogEditor";
import CoverImageUpload from "@/components/admin/blog/post/CoverImageUpload";
import React, { useState } from "react";

const BlogPostPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const handleGenerateSlug = (): void => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setSlug(generatedSlug);
  };

  const handleSaveDraft = (): void => {
    console.log("Saving to drafts:", { title, slug, content, coverImage });
  };

  const handlePost = (): void => {
    console.log("Posting blog:", { title, slug, content, coverImage });
  };

  return (
    <div className="pt-[110px]">
      <div className="container mx-auto p-6">
        <h1 className="text-[22px] font-semibold mb-6 uppercase">
          Post a Blog
        </h1>
        <div className="flex space-x-6">
          <CoverImageUpload
            coverImage={coverImage}
            setCoverImage={setCoverImage}
          />
          <div className="flex-1">
            <BlogEditor
              title={title}
              setTitle={setTitle}
              slug={slug}
              handleGenerateSlug={handleGenerateSlug}
              content={content}
              setContent={setContent}
              onSaveDraft={handleSaveDraft}
              onPost={handlePost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
