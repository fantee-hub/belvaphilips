"use client";

import React from "react";

interface StatusBadgeProps {
  status?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles: {
    [key: string]: { name: string; color: string; description: string };
  } = {
    quote_sent: {
      name: "Awaiting Confirmation",
      color: "#CDA031",
      description:
        "We've received your quote request! Our team has reviewed the details and will get back to you through email shortly.",
    },
    mark_as_paid: {
      name: "Confirmed & Awaiting Product",
      color: "#CDA031",
      description:
        "Thank you for confirming! Please proceed with the shipping instructions provided via email so we can begin the shoot.",
    },
    mark_received: {
      name: "Product Received & Shooting in Progress",
      color: "#369E2E",
      description:
        "We’ve received your product and have started the shoot. We’ll update you once it’s ready for review!",
    },
    mark_for_review: {
      name: "Awaiting Review",
      color: "#CDA031",
      description:
        "Your images are ready! Please review and make payment to proceed with your project.",
    },
    mark_revisions: {
      name: "Awaiting Review",
      color: "#CDA031",
      description:
        "Your images are ready! Please review and let us know if any adjustments are needed.",
    },
    mark_approved: {
      name: "Final Approval Received",
      color: "#369E2E",
      description:
        "Well done! We now have approval for the return of your product.",
    },
    mark_returned: {
      name: "Product Returned",
      color: "#369E2E",
      description: "Your product is being shipped back to you.",
    },
    mark_completed: {
      name: "Project Completed",
      color: "#369E2E",
      description:
        "Our project is complete! Thanks for working with us, we look forward to working with you next!",
    },
  };

  const getStatusDisplay = (status: string | undefined) => {
    const normalizedStatus = (status || "quote_sent")
      .toLowerCase()
      .replace(/ /g, "_");
    return (
      statusStyles[normalizedStatus] || {
        name: normalizedStatus,
        color: "#6B7280",
        description: "Unknown status",
      }
    );
  };

  const {
    name: statusName,
    color: statusColor,
    description,
  } = getStatusDisplay(status);

  return (
    <div className="">
      <div className="flex items-center text-right justify-end gap-[6px]">
        <div className="relative w-[12px] h-[12px] flex items-center justify-center">
          <div
            style={{ backgroundColor: statusColor, opacity: "40%" }}
            className="absolute w-full h-full rounded-full"
          ></div>
          <div
            style={{ backgroundColor: statusColor }}
            className="w-[6px] h-[6px] rounded-full z-10"
          ></div>
        </div>
        <span className="text-[#1D1D1B] font-semibold uppercase">
          {statusName}{" "}
        </span>
      </div>
      <div className="text-right pt-3 text-[#444444] leading-[155%] w-[438px] whitespace-normal break-words ">
        {description}
      </div>
    </div>
  );
};

export default StatusBadge;
