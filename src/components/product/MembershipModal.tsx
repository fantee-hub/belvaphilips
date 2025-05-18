"use client";

import MembershipsSection from "../pricing/MembershipsSection";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface MembershipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MembershipModal({
  open,
  onOpenChange,
}: MembershipModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:!max-w-[1300px] max-w-[350.77px] !pt-6 md:!pb-[46px] bg-white border-none !rounded-none overflow-x-auto  scroll-smooth scrollbar-hide md:overflow-visible hide-close-mobile [&>button]:hidden md:[&>button]:block">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex flex-col items-center">
          <MembershipsSection />
        </div>
      </DialogContent>
    </Dialog>
  );
}
