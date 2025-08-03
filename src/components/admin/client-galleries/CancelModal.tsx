import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface CancelModalProps {
  onOpenChange: (open: boolean) => void;

  showConfirmModal: boolean;
  setShowConfirmModal: (show: boolean) => void;
}

export default function CancelModal({
  onOpenChange,
  showConfirmModal,
  setShowConfirmModal,
}: CancelModalProps) {
  const handleDeleteChanges = () => {
    setShowConfirmModal(false);
    onOpenChange(false);
  };

  const handleStay = () => {
    setShowConfirmModal(false);
  };
  return (
    <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-none">
        <DialogTitle className="text-[20px] font-medium">
          All unsaved changes will be lost
        </DialogTitle>
        <div className="flex gap-4 mt-1">
          <button
            onClick={handleDeleteChanges}
            className="w-[154px] h-[38px] bg-[#E72E2E] text-white rounded-full font-semibold text-sm cursor-pointer hover:bg-[#d12c2c]"
          >
            DELETE CHANGES
          </button>
          <button
            onClick={handleStay}
            className="w-[65px] h-[38px] bg-white border border-[#444444] text-[#444444] rounded-full font-semibold text-sm cursor-pointer  hover:border-[#1D1D1B]"
          >
            STAY
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
