"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TabsComponent from "@/components/admin/blog/allPosts/TabsComponent";
import PostCard from "@/components/admin/blog/allPosts/PostCard";
import DeleteModal from "@/components/admin/blog/allPosts/DeleteModal";
import Pagination from "@/components/admin/blog/allPosts/Pagination";
import { getAllPosts, getAllDrafts } from "@/lib/api";
import Spinner from "@/components/ui/Spinner";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";

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
        setPublishedPosts(data.data);
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
        setDraftPosts(data.data);
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

  const handleDelete = (id: string, title: string, created_at: string) => {
    setPostToDelete({ id, title, created_at });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      if (activeTab === "posts") {
        setPublishedPosts((prev) =>
          prev.filter((post) => post.id !== postToDelete.id)
        );
      } else {
        setDraftPosts((prev) =>
          prev.filter((post) => post.id !== postToDelete.id)
        );
      }
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
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
    <div className="container mx-auto pt-[140px]">
      <TabsComponent activeTab={activeTab} setActiveTab={handleTabChange} />
      <div className="grid grid-cols-3 gap-6">
        {paginatedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {postToDelete && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title={postToDelete.title}
          date={postToDelete.created_at}
        />
      )}
    </div>
  );
};

export default AllPostsPage;
