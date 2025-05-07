"use client";
import ActionButtons from "@/components/admin/blog/post/ActionButtons";
import BlogEditor from "@/components/admin/blog/post/BlogEditor";
import CoverImageUpload from "@/components/admin/blog/post/CoverImageUpload";
import React, { useState } from "react";
import { createPost } from "@/lib/api";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import toast from "react-hot-toast";

const BlogPostPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [isDrafting, setIsDrafting] = useState<boolean>(false);
  const cookies = new Cookies();

  const handleGenerateSlug = (): void => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setSlug(generatedSlug);
  };

  const handleSaveDraft = async () => {
    console.log("Saving to drafts:", { title, slug, content, coverImage });
    setIsDrafting(true);
    const token = cookies.get("admin_token");

    if (token) {
      setAuthToken(token);
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);
      formData.append("status", "draft");
      if (coverImage) {
        formData.append("cover_image", coverImage);
      }

      const { data } = await createPost(formData);
      if (data) {
        toast.success("Saved to draft", {
          style: {
            border: "1px solid #1D1D1B",
            padding: "16px",
            color: "#1D1D1B",
            borderRadius: "6px",
          },
          iconTheme: {
            primary: "#008000",
            secondary: "#FFFAEE",
          },
        });
        setTitle("");
        setSlug("");
        setContent("");
        setCoverImage(null);
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message, {
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
    } finally {
      setIsDrafting(false);
    }
  };

  const handlePost = async () => {
    console.log("Posting blog:", { title, slug, content, coverImage });
    setIsCreatingPost(true);
    const token = cookies.get("admin_token");

    if (token) {
      setAuthToken(token);
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);
      formData.append("status", "published");
      if (coverImage) {
        formData.append("cover_image", coverImage);
      }

      const { data } = await createPost(formData);
      if (data) {
        toast.success("Post created successfully", {
          style: {
            border: "1px solid #1D1D1B",
            padding: "16px",
            color: "#1D1D1B",
            borderRadius: "6px",
          },
          iconTheme: {
            primary: "#008000",
            secondary: "#FFFAEE",
          },
        });
        setTitle("");
        setSlug("");
        setContent("");
        setCoverImage(null);
        console.log("Post created successfully:", data);
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message, {
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
    } finally {
      setIsCreatingPost(false);
    }
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
              isCreatingPost={isCreatingPost}
              isDrafting={isDrafting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
