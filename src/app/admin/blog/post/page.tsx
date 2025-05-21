"use client";

import PostContent from "@/components/admin/blog/post/PostContent";
import Spinner from "@/components/ui/Spinner";
import { Suspense } from "react";

const BlogPostPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
          </div>
        </div>
      }
    >
      <PostContent />
    </Suspense>
  );
};

export default BlogPostPage;
