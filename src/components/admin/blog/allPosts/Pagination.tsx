import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex space-x-2 mt-[80px] justify-center">
      <button
        className="px-3 py-1 border rounded"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <PiCaretLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`w-[46px] h-[38px] flex items-center justify-center border ${
            currentPage === page ? "border border-[#FEC845] text-[#FEC845]" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 border rounded"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <PiCaretRight />
      </button>
    </div>
  );
};

export default Pagination;
