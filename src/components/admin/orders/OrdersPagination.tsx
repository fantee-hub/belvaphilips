"use client";

import React from "react";
import Link from "next/link";

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  status: string;
}

const OrdersPagination: React.FC<OrdersPaginationProps> = ({
  currentPage,
  totalPages,
  status,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(
      <PageButton
        key={1}
        page={1}
        isActive={currentPage === 1}
        status={status}
      />
    );

    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="px-3 py-2 text-gray-500">
          ...
        </span>
      );
    }

    if (currentPage > 2) {
      pageNumbers.push(
        <PageButton
          key={currentPage - 1}
          page={currentPage - 1}
          isActive={false}
          status={status}
        />
      );
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(
        <PageButton
          key={currentPage}
          page={currentPage}
          isActive={true}
          status={status}
        />
      );
    }

    if (currentPage < totalPages - 1) {
      pageNumbers.push(
        <PageButton
          key={currentPage + 1}
          page={currentPage + 1}
          isActive={false}
          status={status}
        />
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis2" className="px-3 py-2 text-gray-500">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <PageButton
          key={totalPages}
          page={totalPages}
          isActive={currentPage === totalPages}
          status={status}
        />
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-1 my-8">
      <PaginationArrow
        direction="prev"
        disabled={currentPage === 1}
        currentPage={currentPage}
        status={status}
      />

      <div className="flex items-center">{renderPageNumbers()}</div>

      <PaginationArrow
        direction="next"
        disabled={currentPage === totalPages}
        currentPage={currentPage}
        status={status}
      />
    </div>
  );
};

interface PageButtonProps {
  page: number;
  isActive: boolean;
  status: string;
}

const PageButton: React.FC<PageButtonProps> = ({ page, isActive, status }) => {
  return (
    <Link
      href={`/admin/orders?status=${status}&page=${page}`}
      className={`w-[46px] h-[38px] mx-1 flex items-center justify-center text-sm   ${
        isActive
          ? " text-[#FEC845] border border-[#FEC845] font-semibold"
          : "text-[#5C5C5C] hover:bg-gray-100"
      }`}
    >
      {page}
    </Link>
  );
};

interface PaginationArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  currentPage: number;
  status: string;
}

const PaginationArrow: React.FC<PaginationArrowProps> = ({
  direction,
  disabled,
  currentPage,
  status,
}) => {
  const newPage = direction === "prev" ? currentPage - 1 : currentPage + 1;

  if (disabled) {
    return (
      <span className="px-2 py-1 rounded-md text-gray-300 cursor-not-allowed">
        {direction === "prev" ? (
          <ArrowIcon direction="left" />
        ) : (
          <ArrowIcon direction="right" />
        )}
      </span>
    );
  }

  return (
    <Link
      href={`/admin/orders?status=${status}&page=${newPage}`}
      className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100"
    >
      {direction === "prev" ? (
        <ArrowIcon direction="left" />
      ) : (
        <ArrowIcon direction="right" />
      )}
    </Link>
  );
};

const ArrowIcon: React.FC<{ direction: "left" | "right" }> = ({
  direction,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      {direction === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
};

export default OrdersPagination;
