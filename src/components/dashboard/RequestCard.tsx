"use client";

import React from "react";
import { PiCalendarDots } from "react-icons/pi";
import StatusBadge from "./StatusBadge";

interface Order {
  id: string;
  created_at: string;
  status: string;
}

interface RequestCardProps {
  order: Order;
}

const RequestCard: React.FC<RequestCardProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options).toUpperCase();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-[22px] font-semibold text-[#1D1D1B] uppercase mb-4">
        REQUESTS
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-[#787878] text-sm uppercase">Request ID</p>
          <p className="text-[#1D1D1B] font-semibold text-base">{order.id}</p>
        </div>
        <div>
          <p className="text-[#787878] text-sm uppercase">Date Created</p>
          <p className="text-[#1D1D1B] font-semibold text-base flex items-center gap-1">
            <PiCalendarDots className="text-lg" />
            {formatDate(order.created_at)}
          </p>
        </div>
        <div>
          <p className="text-[#787878] text-sm uppercase">Status</p>
          <StatusBadge status={order.status} />
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
