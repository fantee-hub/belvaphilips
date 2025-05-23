"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TabsComponent from "@/components/admin/blog/allPosts/TabsComponent";
import PostCard from "@/components/admin/blog/allPosts/PostCard";
import DeleteModal from "@/components/admin/blog/allPosts/DeleteModal";
import Pagination from "@/components/admin/blog/allPosts/Pagination";
import { getAllPosts, getAllDrafts, deletePost } from "@/lib/api";
import Spinner from "@/components/ui/Spinner";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import { toast } from "react-hot-toast";

interface PostData {
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  status: string;
  id: string;
}

const AllPostsPage: React.FC = () => {
  const [publishedPosts, setPublishedPosts] = useState<PostData[]>([]);
  const [draftPosts, setDraftPosts] = useState<PostData[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "drafts">("posts");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{
    id: string;
    title: string;
    created_at: string;
  } | null>(null);
  const router = useRouter();
  const cookies = new Cookies();

  const postsPerPage = 10;

  const fetchPublishedPosts = async () => {
    setIsFetchingPosts(true);
    try {
      const { data } = await getAllPosts(1, postsPerPage);
      if (data) {
        setPublishedPosts(data.data.posts);
      }
    } catch (e) {
      console.log("Error fetching published posts:", e);
    } finally {
      setIsFetchingPosts(false);
    }
  };

  const fetchDrafts = async () => {
    setIsFetchingPosts(true);
    const token = cookies.get("admin_token");

    if (token) {
      setAuthToken(token);
    }
    try {
      const { data } = await getAllDrafts(1, postsPerPage);
      if (data) {
        setDraftPosts(data.data.posts);
      }
    } catch (e) {
      console.log("Error fetching drafts:", e);
    } finally {
      setIsFetchingPosts(false);
    }
  };

  useEffect(() => {
    if (activeTab === "posts") {
      fetchPublishedPosts();
    } else {
      fetchDrafts();
    }
  }, []);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    setCurrentPage(1);

    if (tab === "posts" && publishedPosts.length === 0) {
      fetchPublishedPosts();
    } else if (tab === "drafts" && draftPosts.length === 0) {
      fetchDrafts();
    }
  };

  const getCurrentPosts = () => {
    return activeTab === "posts" ? publishedPosts : draftPosts;
  };

  const currentPosts = getCurrentPosts();
  const totalPages = Math.ceil(currentPosts.length / postsPerPage);

  const paginatedPosts = currentPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleEdit = (id: string) => {
    router.push(`/admin/blog/post/${id}`);
  };

  const handleDelete = async (
    id: string,
    title: string,
    created_at: string
  ) => {
    setPostToDelete({ id, title, created_at });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    setIsDeleting(true);

    try {
      await deletePost(postToDelete.id);

      toast.success("Deleted Successfully", {
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

      if (activeTab === "posts") {
        setPublishedPosts((prev) =>
          prev.filter((post) => post.id !== postToDelete.id)
        );
        fetchPublishedPosts();
      } else {
        setDraftPosts((prev) =>
          prev.filter((post) => post.id !== postToDelete.id)
        );
        setIsDeleteModalOpen(false);
        fetchDrafts();
      }

      setPostToDelete(null);
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isFetchingPosts) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-[140px]  px-4">
      <TabsComponent activeTab={activeTab} setActiveTab={handleTabChange} />

      {currentPosts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-20">
          There are no {activeTab === "posts" ? "posts" : "drafts"} available.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {paginatedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <div className="pb-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      {postToDelete && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title={postToDelete.title}
          date={postToDelete.created_at}
          postId={postToDelete.id}
          postType={activeTab === "posts" ? "published" : "draft"}
          publishedPosts={fetchPublishedPosts}
          draftPosts={fetchDrafts}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default AllPostsPage;
