"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/helperFunctions";
import Image from "next/image";
import { PiCalendarDots } from "react-icons/pi";

interface Gallery {
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  id: string;
  images: string[];
}

interface ClientGalleryTableModalProps {
  order: Gallery | null;
  isOpen: boolean;
  onClose: () => void;
}

const ClientGalleryTableModal: React.FC<ClientGalleryTableModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" w-full md:p-7 p-4 !border-none rounded-none  ">
        <DialogHeader>
          <DialogTitle className="!font-normal pb-5 border-b">
            <div className="flex flex-col sm:flex-row sm:gap-9 gap-4 text-left">
              <div>
                <div className="text-sm sm:text-base text-[#787878] mb-2">
                  REQUEST ID
                </div>
                <div className="font-semibold text-[#1D1D1B] text-sm sm:text-base">
                  {order?.id || "N/A"}
                </div>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>

          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <div>
                <div className="text-sm sm:text-base text-[#787878] mb-2">
                  DATE CREATED
                </div>
                <div className="font-semibold text-[#1D1D1B] text-sm sm:text-base">
                  <div className="flex items-center gap-1 justify-center sm:justify-start">
                    <PiCalendarDots className="text-lg" />
                    <p>
                      {order
                        ? formatDate(order.created_at)
                        : "No date available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-0">
                <div className="text-sm sm:text-base text-[#787878] mb-2">
                  IMAGES
                </div>
                <div className="grid  gap-2 grid-cols-3 ">
                  {order?.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Gallery Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ClientGalleryTableModal;
