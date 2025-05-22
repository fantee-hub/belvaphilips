"use client";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/helperFunctions";
import { PiCalendarDots } from "react-icons/pi";

interface Post {
  id: string;
  title: string;
  slug: string;
  cover_image: string;
  created_at: string;
  content: string;
}

interface LatestPostsProps {
  posts: Post[];
  currentPostId: string;
}

export default function LatestPosts({
  posts,
  currentPostId,
}: LatestPostsProps) {
  const filteredPosts = posts
    .filter((post: Post) => post.id !== currentPostId)
    .slice(0, 3);

  return (
    <div className="md:pl-6 md:border-l-[0.5px] md:border-[#C9C9C9]">
      <h2 className="md:text-[44px] text-[30px] font-semibold text-[#C9C9C9] md:mb-6 mb-5 tracking-[-1.58px] leading-[115%] uppercase">
        Latest Posts
      </h2>

      {filteredPosts.length === 0 ? (
        <p className="text-[#787878] text-base italic">
          No posts available at the moment.
        </p>
      ) : (
        <div className="space-y-5">
          {filteredPosts.map((post: Post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block">
              <div className="flex items-center gap-4 border-[0.5px] border-[#C9C9C9] p-5">
                <div>
                  <p className="text-xs text-[#787878] mb-2">
                    <PiCalendarDots className="inline-block mr-1 text-lg" />
                    {formatDate(post.created_at || "")}
                  </p>
                  <h3 className="text-[22px] uppercase font-medium text-[#444444] line-clamp-2 tracking-[-1px] leading-[130%] max-w-[463px]">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
