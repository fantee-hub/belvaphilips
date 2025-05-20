"use client";

import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import { PiCaretDownBold } from "react-icons/pi";
import { upDateStatusOfOrder, getOrdersById } from "@/lib/api";

interface StatusUpdateDropdownProps {
  orderId: string;
  currentStatus: string | undefined;
  onStatusUpdated: (updatedOrder: any) => void;
}

const StatusUpdateDropdown: React.FC<StatusUpdateDropdownProps> = ({
  orderId,
  currentStatus,
  onStatusUpdated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    maxHeight: "auto",
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cookies = new Cookies();

  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollX = window.scrollX || window.pageXOffset;

        // Calculate the maximum height for the dropdown (desktop only)
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - (rect.bottom + scrollY);
        const maxHeight = Math.min(spaceBelow - 10, viewportHeight * 0.6); // 60% of viewport height as a fallback

        setDropdownPosition({
          top: rect.bottom + scrollY + 4,
          left: rect.left + scrollX,
          maxHeight: `${maxHeight}px`,
        });
      }
    };

    updatePosition();

    // Update position on scroll or resize (desktop only)
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const getStatusOptions = () => {
    const statusWorkflow = [
      {
        id: "quote_sent",
        label: "QUOTE SENT",
        description:
          "We've received your quote request! Our team has reviewed the details and will get back to you through email shortly.",
      },
      {
        id: "mark_as_paid",
        label: "MARK AS PAID",
        description:
          "The client has paid for the quote. Wait for product shipment.",
      },
      {
        id: "mark_received",
        label: "MARK PRODUCT AS RECEIVED & START SHOOT",
        description: "The product has arrived. Begin the photoshoot.",
      },
      {
        id: "send_for_review",
        label: "SENT IMAGES FOR REVIEW",
        description: "The images are ready. Notify the client for approval.",
      },
      {
        id: "mark_revisions",
        label: "MARK AS REVISIONS IN PROGRESS",
        description: "The client requested changes. Start working on them.",
      },
      {
        id: "mark_approved",
        label: "MARK AS APPROVED AND ARRANGE PRODUCT RETURN",
        description:
          "The client approved the final images. Arrange return shipping.",
      },
      {
        id: "mark_returned",
        label: "MARK AS RETURNED",
        description: "The product has been shipped back.",
      },
      {
        id: "mark_completed",
        label: "COMPLETE PROJECT",
        description:
          "The project is finished. No further actions are required.",
      },
    ];

    const statusMap: { [key: string]: number } = {
      pending: -1,
      quote_sent: 0,
      mark_as_paid: 1,
      mark_received: 2,
      send_for_review: 3,
      mark_revisions: 4,
      mark_approved: 5,
      mark_returned: 6,
      mark_completed: 7,
    };

    const normalizedStatus = (currentStatus || "pending").toLowerCase();
    const currentIndex = statusMap[normalizedStatus] ?? -1;

    if (currentIndex === -1 || currentIndex === statusWorkflow.length - 1) {
      return [];
    }

    return normalizedStatus === "pending"
      ? statusWorkflow.map((option, index) => ({
          ...option,
          isNextStep: index === 0,
        }))
      : statusWorkflow.slice(currentIndex + 1).map((option, index) => ({
          ...option,
          isNextStep: index === 0,
        }));
  };

  const handleStatusUpdate = async (statusId: string) => {
    setIsUpdating(true);
    setIsOpen(false);

    const token = cookies.get("admin_token");
    if (token) {
      setAuthToken(token);
    }

    try {
      await upDateStatusOfOrder(orderId, { status: statusId } as any);
      console.log(`Updated order ${orderId} status to ${statusId}`);

      const response = await getOrdersById(orderId);
      if (response.data) {
        onStatusUpdated(response.data.data);
      }

      window.location.reload();
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const options = getStatusOptions();

  if (options.length === 0) {
    return (
      <div className="text-sm text-gray-500">No status updates available</div>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className="inline-flex justify-center items-center w-[228px] sm:w-auto md:px-4 py-2  border border-[#1D1D1B] shadow-sm text-sm font-medium rounded-full cursor-pointer text-[#6E6E6E] bg-white hover:bg-gray-50 focus:outline-none uppercase"
      >
        {isUpdating ? "Updating..." : "SELECT A STATUS UPDATE"}
        <PiCaretDownBold
          className={`transition-transform duration-300 text-base ml-2 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 md:fixed z-50 w-[90vw] sm:max-w-[455px] bg-white shadow rounded-[12px] border-[0.5px] border-[#C9C9C9] focus:outline-none sm:top-auto sm:left-auto top-[100%] left-0"
          style={{
            ...(window.innerWidth < 640
              ? {
                  top: "100%",
                  left: 0,
                  overflowY: "auto",
                }
              : {
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                  maxHeight: "341px",
                  overflowY: "auto",
                }),
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
          <div className="py-1 custom-scroll">
            {options.map((option) => (
              <div
                key={option.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <div className="px-4 py-3">
                  <div
                    className={`text-sm font-semibold ${
                      option.isNextStep ? "text-[#1D1D1B]" : "text-gray-400"
                    } whitespace-nowrap overflow-hidden text-ellipsis w-full`}
                  >
                    {option.label}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      option.isNextStep ? "text-[#444444]" : "text-gray-300"
                    } whitespace-nowrap overflow-hidden text-ellipsis w-full`}
                  >
                    {option.description}
                  </div>
                  <button
                    onClick={() => handleStatusUpdate(option.id)}
                    disabled={!option.isNextStep}
                    className={`mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-semibold rounded-full text-white cursor-pointer ${
                      option.isNextStep
                        ? "bg-[#1D1D1B] hover:bg-gray-700"
                        : "bg-gray-300 cursor-not-allowed"
                    } focus:outline-none`}
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusUpdateDropdown;
