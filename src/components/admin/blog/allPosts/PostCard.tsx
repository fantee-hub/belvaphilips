import { formatDate } from "@/lib/helperFunctions";
import { Pencil, Trash2 } from "lucide-react";
import { PiCalendarDots } from "react-icons/pi";

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
  onEdit: (id: string) => void;
  onDelete: (id: string, title: string, created_at: string) => void;
}> = ({ post, onEdit, onDelete }) => {
  return (
    <div className="w-full  border overflow-hidden shadow-sm">
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
          <div className=" pb-[2px] gap-1  flex items-center space-x-1 bg-white ">
            <button className="bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 uppercase font-semibold text-[#787878]">
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <div className="w-[0.5px] h-[15px] bg-[#CFCFCF]"></div>
            <button
              onClick={() => onDelete(post.id, post.title, post.created_at)}
              className="bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 uppercase font-semibold text-[#787878]"
            >
              <Trash2 className="h-4 w-4 text-[#E72E2E]" />
              <span>Delete</span>
            </button>
          </div>
        </div>
        <h2 className="text-[24px] font-semibold uppercase">{post.title}</h2>
      </div>
    </div>
  );
};

export default PostCard;
