"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const OrdersTabs = () => {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "pending";

  const tabs = [
    { name: "PENDING REQUESTS", status: "pending" },
    { name: "ACTIVE PROJECTS", status: "active" },
    { name: "COMPLETED PROJECTS", status: "completed" },
  ];

  return (
    <div className="mb-6">
      <div className="flex space-x-11">
        {tabs.map((tab) => {
          const isActive = currentStatus === tab.status;
          return (
            <Link
              key={tab.status}
              href={`/admin/orders?status=${tab.status}`}
              className={`py-4 px-1 inline-flex items-center text-lg font-semibold uppercase ${
                isActive
                  ? "text-black"
                  : "text-[#ACACAC] hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersTabs;
