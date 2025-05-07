import { formatDate } from "@/lib/helperFunctions";
import { Pencil, Trash2 } from "lucide-react";
import { PiCalendarDots } from "react-icons/pi";
import { motion } from "framer-motion";
import Link from "next/link";

const PostCard: React.FC<{
  post: {
    created_at: string;
    updated_at: string;
    title: string;
    slug: string;
    content: string;
    cover_image: string;
    status: string;
    id: string;
  };
  index: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string, title: string, created_at: string) => void;
}> = ({ post, onEdit, onDelete, index }) => {
  return (
    <motion.div
      className="w-full  border overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        delay: (index * 0.1) % 0.9,
        ease: "easeOut",
      }}
    >
      <Link href={`/blog/${post.id}`} className="block">
        <img
          src={
            post.cover_image
              ? post.cover_image
              : "/assets/images/blog-placeholder.png"
          }
          alt={post.title}
          className="w-full h-[300px] object-cover"
        />
        <div className="p-4">
          <div className="flex items-center text-gray-500 text-sm mb-2 justify-between">
            <span className="mr-2 flex items-center gap-1">
              <PiCalendarDots className="text-lg" />
              {formatDate(post.created_at)}
            </span>
          </div>
          <h2 className="text-[24px] font-semibold uppercase">{post.title}</h2>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
