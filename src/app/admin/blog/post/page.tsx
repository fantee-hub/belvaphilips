"use client";
import ActionButtons from "@/components/admin/blog/post/ActionButtons";
import BlogEditor from "@/components/admin/blog/post/BlogEditor";
import CoverImageUpload from "@/components/admin/blog/post/CoverImageUpload";
import React, { useEffect, useState } from "react";
import { createPost, getPostById, updatePost } from "@/lib/api";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import toast from "react-hot-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import { useSearchParams, useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

const BlogPostPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [isDrafting, setIsDrafting] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const cookies = new Cookies();
  const searchParams = useSearchParams();
  const router = useRouter();
  const postId = searchParams.get("id");
  const isEditing = !!postId;

  console.log(postId, isEditing);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "<p>Enter your blog content</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (isEditing && postId) {
      const fetchPost = async () => {
        setIsFetching(true);
        try {
          const token = cookies.get("admin_token");
          if (token) {
            setAuthToken(token);
          }
          const { data } = await getPostById(postId);
          const post = data.data;
          setTitle(post.title);
          setSlug(post.slug);
          setContent(post.content);
          setCoverImageUrl(post.cover_image);
          if (editor) {
            editor.commands.setContent(post.content);
          }
        } catch (error) {
          console.error("Failed to fetch post:", error);
          toast.error("Failed to load post data", {
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
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [postId, isEditing, editor]);

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
        if (editor) {
          editor.commands.clearContent();
        }
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

  const handleUpdate = async () => {
    if (!postId) return;
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
      } else if (coverImageUrl) {
        formData.append("cover_image", "");
      }

      const { data } = await updatePost(postId, formData);
      if (data) {
        toast.success("Post updated successfully", {
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
        router.push("/admin/blog/all-posts");
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

  if (isEditing && isFetching) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="py-[140px]">
      <div className="container mx-auto mx:p-6 px-4">
        <h1 className="text-[22px] font-semibold mb-6 uppercase">
          Post a Blog
        </h1>
        <div className="flex space-x-6 md:flex-row flex-col gap-[30px] md:gap-0">
          <CoverImageUpload
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            coverImageUrl={coverImageUrl}
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
              editor={editor}
              isEditing={isEditing}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
