import { Suspense } from "react";

import Spinner from "@/components/ui/Spinner";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostDetails from "@/components/blog/PostDetails";
import { getPostById, getAllPosts } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const [postResponse, latestPostsResponse] = await Promise.all([
    getPostById(id),
    getAllPosts(1, 4),
  ]);

  const post = postResponse.data.data;
  const latestPosts = latestPostsResponse.data.data.posts;

  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="text-center">
                <Spinner size="lg" />
              </div>
            </div>
          }
        >
          <PostDetails
            post={post}
            latestPosts={latestPosts}
            currentPostId={id}
          />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
