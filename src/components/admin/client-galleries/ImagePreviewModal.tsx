import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ImagePreviewModalProps {
  showImageModal: boolean;
  setShowImageModal: (show: boolean) => void;

  handleCloseImageModal: () => void;
  selectedImage: { url: string; name: string } | null;
}

export default function ImagePreviewModal({
  showImageModal,
  setShowImageModal,
  selectedImage,
  handleCloseImageModal,
}: ImagePreviewModalProps) {
  return (
    <Dialog open={showImageModal} onOpenChange={handleCloseImageModal}>
      <DialogContent className="max-w-4xl w-full p-0 !border-none bg-transparent shadow-none">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="relative flex items-center justify-center min-h-[80vh]">
          <button
            onClick={handleCloseImageModal}
            className="absolute top-4 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>

          {selectedImage && (
            <div className="flex flex-col items-center justify-center p-6 max-w-full max-h-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="text-white mt-4 text-center text-sm opacity-80">
                {selectedImage.name}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
