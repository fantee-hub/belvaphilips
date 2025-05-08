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

    // Always show the first page
    pageNumbers.push(
      <PageButton
        key={1}
        page={1}
        isActive={currentPage === 1}
        status={status}
      />
    );

    // Add ellipsis if there are many pages before the current page
    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="px-3 py-2 text-gray-500">
          ...
        </span>
      );
    }

    // Show one page before current if it exists and isn't the first page
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

    // Show current page if it's not the first or last
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

    // Show one page after current if it exists and isn't the last page
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

    // Add ellipsis if there are many pages after the current page
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis2" className="px-3 py-2 text-gray-500">
          ...
        </span>
      );
    }

    // Always show the last page if we have more than one page
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
      className={`px-3 py-1 mx-1 rounded-md ${
        isActive
          ? "bg-amber-100 text-amber-800 border border-amber-300"
          : "text-gray-700 hover:bg-gray-100"
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
