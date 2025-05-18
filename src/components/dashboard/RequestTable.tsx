"use client";

import React from "react";
import { PiCalendarDots } from "react-icons/pi";
import StatusBadge from "./StatusBadge";
import Spinner from "../ui/Spinner";

interface RequestTableProps {
  orders: any;
  isLoading: boolean;
}

const RequestTable: React.FC<RequestTableProps> = ({ orders, isLoading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.updated_at || a.created_at).getTime();
    const dateB = new Date(b.updated_at || b.created_at).getTime();
    return dateB - dateA;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-40 max-w-[891px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              REQUEST ID
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider">
              DATE CREATED
            </th>
            <th className="px-6 py-3 text-left text-base font-medium text-[#787878] uppercase tracking-wider  flex justify-end">
              STATUS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedOrders.length > 0 ? (
            sortedOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-[#1D1D1B]">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-[#1D1D1B] font-semibold">
                  <span className="flex items-center gap-1">
                    <PiCalendarDots className="text-lg" />
                    {formatDate(order.created_at)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
