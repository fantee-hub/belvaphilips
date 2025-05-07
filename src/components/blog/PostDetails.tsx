"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatDate } from "@/lib/helperFunctions";
import ReactMarkdown from "react-markdown";
import { PiCalendarDots } from "react-icons/pi";
import LatestPosts from "./LatestPosts";

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

            <div className="prose max-w-none text-[#444444]">
              <ReactMarkdown>{post.content}</ReactMarkdown>
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
