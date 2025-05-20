"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { PiCaretDownBold } from "react-icons/pi";

const OrdersTabs = () => {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "pending";
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const Tabs = [
    { name: "PENDING REQUESTS", status: "pending" },
    { name: "ACTIVE PROJECTS", status: "active" },
    { name: "COMPLETED PROJECTS", status: "completed" },
  ];

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  const getCurrentTabName = () => {
    const currentTab = Tabs.find((tab) => tab.status === currentStatus);
    return currentTab ? currentTab.name : "PENDING REQUESTS";
  };

  return (
    <div className="mb-6">
      {/* Desktop View: Tabs */}
      <div className="hidden md:flex space-x-11">
        {Tabs.map((tab) => {
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

      {/* Mobile View: Dropdown */}
      <div className="block md:hidden">
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex  items-center w-full pb-5 border-b border-[#D1D1D1]  text-sm font-semibold  cursor-pointer text-[#1D1D1B] bg-white hover:bg-gray-50 focus:outline-none uppercase"
          >
            {getCurrentTabName()}
            <PiCaretDownBold
              className={`transition-transform duration-300 text-base ml-2 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div
              className="fixed z-50 w-[90vw] bg-white  rounded-[12px] border-[0.5px] border-[#C9C9C9] focus:outline-none"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 4px;
                }
                div::-webkit-scrollbar-track {
                  background: #e5e5e5;
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                  background: #313131;
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: #313131;
                }
              `}</style>
              <div className="py-1">
                {Tabs.map((tab) => (
                  <Link
                    key={tab.status}
                    href={`/admin/orders?status=${tab.status}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-[#1D1D1B] uppercase hover:bg-gray-100"
                  >
                    {tab.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersTabs;
