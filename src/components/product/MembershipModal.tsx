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
      <DialogContent className="!max-w-[1403px] !pt-6 !pb-[46px] bg-white border-none !rounded-none">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex flex-col items-center">
          <MembershipsSection />
        </div>
      </DialogContent>
    </Dialog>
  );
}
