"use client";

import Pagination from "@/components/admin/blog/allPosts/Pagination";

import { formatDate } from "@/lib/helperFunctions";
import { useState } from "react";
import { PiCalendarDots } from "react-icons/pi";

const sortedOrders = [
  {
    id: "1",
    order_name: "Order #12345",
    created_at: "2023-10-01T12:00:00Z",
    updated_at: "2023-10-02T12:00:00Z",
    status: "pending",
  },
];

export default function ClientGalleries() {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );
  return (
    <div className="container mx-auto md:pt-[140px] py-[120px] px-4 md:px-0">
      <div className="pb-[56px] pl-6">
        <h1 className="text-[22px] font-semibold text-[#1D1D1B]">
          CLIENT GALLERIES
        </h1>
      </div>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-[595px] divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
                TITLE
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
                DATE CREATED
              </th>
              <th className="px-6 py-3 text-right text-base font-medium text-[#787878] uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrders.length > 0 ? (
              sortedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-[#1D1D1B]">
                    {order.order_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-[#1D1D1B] font-semibold">
                    <span className="flex items-center gap-1">
                      <PiCalendarDots className="text-lg" />
                      {formatDate(order.created_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 flex justify-end">
                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase cursor-pointer">
                      VIEW DETAILS
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No {status} orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {paginatedOrders.length > 0 ? (
          <div className="space-y-10">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="">
                <div className="space-y-7">
                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      REQUEST ID
                    </p>
                    <p className="text-base font-semibold text-[#1D1D1B]">
                      {order.order_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      DATE CREATED
                    </p>
                    <p className="text-base font-semibold text-[#1D1D1B] flex items-center gap-1">
                      <PiCalendarDots className="text-lg" />
                      {formatDate(order.created_at)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#787878] uppercase">
                      ACTION
                    </p>
                    <button className="mt-1 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold uppercase cursor-pointer">
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 py-4">
            No data found
          </div>
        )}
      </div>
      <div className="flex justify-start">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
