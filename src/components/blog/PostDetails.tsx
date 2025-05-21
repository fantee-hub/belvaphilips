"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatDate } from "@/lib/helperFunctions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PiCalendarDots } from "react-icons/pi";
import LatestPosts from "./LatestPosts";
import { Components } from "react-markdown";
import { ImgHTMLAttributes } from "react";
import rehypeRaw from "rehype-raw";
import parse from "html-react-parser";

interface Post {
  id: string;
  title: string;
  slug: string;
  cover_image: string;
  created_at: string;
  content: string;
}

interface PostDetailsProps {
  post: Post;
  latestPosts: Post[];
  currentPostId: string;
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface MarkdownImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: any;
  alt?: string;
}

const components: Components = {
  img: ({ src, alt }: MarkdownImageProps) => {
    console.log("Markdown Image Src:", src, "Alt:", alt);
    return (
      <Image
        src={
          (src instanceof Blob ? URL.createObjectURL(src) : src) ||
          "/assets/images/blog-placeholder.png"
        }
        alt={alt || "Post Image"}
        width={600}
        height={400}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover w-full h-auto"
      />
    );
  },
};

export default function PostDetails({
  post,
  latestPosts,
  currentPostId,
}: PostDetailsProps) {
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  return (
    <div className="bg-white md:pt-[100px] pt-9">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          {/* Main Post Content */}
          <div className="md:col-span-2">
            <div>
              <h1 className="text-[44px] font-semibold text-[#1D1D1B] mb-4 uppercase tracking-[-1.58px] leading-[115%]">
                {post.title}
              </h1>
              <p className="text-sm text-[#787878] mb-6">
                <PiCalendarDots className="inline-block mr-1 text-lg" />
                {formatDate(post.created_at || "")}
              </p>
            </div>
            <div className="relative h-[858px] w-full mb-8">
              <Image
                src={post.cover_image || "/assets/images/blog-placeholder.png"}
                alt={post.title || "Post Cover Image"}
                fill
                className="object-cover"
              />
            </div>

            <div
              className="max-w-none text-[#444444] space-y-4 
  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-left 
  [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-3 
  [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 
  [&_p]:leading-relaxed [&_p]:mb-4"
            >
              {parse(post.content)}
            </div>
          </div>

          {/* Latest Posts Sidebar */}
          <div className="md:col-span-1">
            <LatestPosts posts={latestPosts} currentPostId={currentPostId} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
