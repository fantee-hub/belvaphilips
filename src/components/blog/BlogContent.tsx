"use client";
import { AnimatePresence, motion } from "framer-motion";
import { getAllPosts } from "@/lib/api";
// import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import PostCard from "./PostCard";

interface Post {
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  status: string;
  id: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogContent() {
  const [posts, setPublishedPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
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
    fetchPublishedPosts();
  }, []);

  const currentPosts = posts;
  const totalPages = Math.ceil(currentPosts.length / postsPerPage);

  const paginatedPosts = currentPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  console.log("posts", posts);
  if (isFetchingPosts) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white md:pt-[100px] pt-9">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:text-[82.83px] uppercase text-[38px] md:font-semibold font-bold md:mb-[30px] mb-7 leading-[115%] md:tracking-[-3px] tracking-[-0.5px]"
        >
          Blog
        </motion.h1>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {paginatedPosts.map((post, index) => (
              <PostCard post={post} key={post.id} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
