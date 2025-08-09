import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface CancelModalProps {
  onOpenChange: (open: boolean) => void;
  handleDeleteChanges: () => void;
  showConfirmModal: boolean;
  handleStay: () => void;
  galleryTitle?: string;
  isDeleting?: boolean;
}

export default function GalleriesDeleteModal({
  onOpenChange,
  showConfirmModal,
  handleDeleteChanges,
  handleStay,
  galleryTitle,
  isDeleting = false,
}: CancelModalProps) {
  return (
    <Dialog open={showConfirmModal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[498px] p-6 rounded-none">
        <DialogTitle className="md:text-[20px] text-base font-medium sm:max-w-[381px]">
          This gallery cannot be recovered, are you sure you want to proceed?
        </DialogTitle>
        <div className="flex gap-4 mt-5">
          <button
            onClick={handleDeleteChanges}
            disabled={isDeleting}
            className="px-[14px] md:h-[38px] h-[32px] bg-[#E72E2E] text-white rounded-full font-semibold text-sm cursor-pointer hover:bg-[#d12c2c] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E72E2E]"
          >
            {isDeleting ? "DELETING..." : "DELETE"}
          </button>
          <button
            onClick={handleStay}
            disabled={isDeleting}
            className="w-[86px] md:h-[38px] h-[32px] bg-white border border-[#444444] text-[#444444] rounded-full font-semibold text-sm cursor-pointer hover:border-[#1D1D1B] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[#444444]"
          >
            CANCEL
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
