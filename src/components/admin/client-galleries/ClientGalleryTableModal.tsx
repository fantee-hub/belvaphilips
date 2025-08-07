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
import { useState, useRef } from "react";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import ImagePreviewModal from "./ImagePreviewModal";
import { deleteGalleryImage, updateGallery } from "@/lib/api";

interface Gallery {
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  id: string;
  images: string[];
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
}

interface ClientGalleryTableModalProps {
  order: Gallery | null;
  isOpen: boolean;
  onClose: () => void;
  fetchGalleries: () => void;
}

const ClientGalleryTableModal: React.FC<ClientGalleryTableModalProps> = ({
  order,
  isOpen,
  onClose,
  fetchGalleries,
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(
    null
  );
  const [showImageModal, setShowImageModal] = useState(false);
  const [deletedExistingImages, setDeletedExistingImages] = useState<string[]>(
    []
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cookies = new Cookies();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        const imageUrl = URL.createObjectURL(file);
        const newImage: UploadedImage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          file,
          url: imageUrl,
          name: file.name,
        };
        newImages.push(newImage);
      }
    });

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files) return;

    const newImages: UploadedImage[] = [];
    Array.from(files).forEach((file) => {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        const imageUrl = URL.createObjectURL(file);
        const newImage: UploadedImage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          file,
          url: imageUrl,
          name: file.name,
        };
        newImages.push(newImage);
      }
    });

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_PRESET_NAME}`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleDeleteImage = (imageId: string) => {
    setUploadedImages((prev) => {
      const imageToDelete = prev.find((img) => img.id === imageId);
      if (imageToDelete) {
        URL.revokeObjectURL(imageToDelete.url);
      }
      return prev.filter((img) => img.id !== imageId);
    });
  };

  const generatedLink = `belvaphilips.com/${order?.slug || ""}`;

  const handleViewImage = (image: UploadedImage) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleViewExistingImage = (imageUrl: string, imageName: string) => {
    const imageData: UploadedImage = {
      id: "existing",
      file: null as any,
      url: imageUrl,
      name: imageName,
    };
    setSelectedImage(imageData);
    setShowImageModal(true);
  };
  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const handleCopyLink = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpdate = async () => {
    if (uploadedImages.length === 0) {
      toast.error("Please upload at least one new image.", {
        style: {
          border: "0.5px solid #1D1D1B",
          padding: "16px",
          color: "#1D1D1B",
          borderRadius: "6px",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

    setIsUpdating(true);

    const token = cookies.get("admin_token");

    if (token) {
      setAuthToken(token);
    }

    try {
      const newImageUrls = await Promise.all(
        uploadedImages.map((img) => uploadToCloudinary(img.file))
      );

      const updatedImages = [...(order?.images || []), ...newImageUrls];

      const galleryData = {
        title: order?.title || "",
        slug: order?.slug || "",
        images: updatedImages,
      };

      await updateGallery(order?.id || "", galleryData);

      toast.success("Gallery updated successfully", {
        style: {
          border: "1px solid #1D1D1B",
          padding: "16px",
          color: "#1D1D1B",
          borderRadius: "6px",
        },
        iconTheme: {
          primary: "#008000",
          secondary: "#FFFAEE",
        },
      });
      onClose();
      setUploadedImages([]);
      fetchGalleries();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message, {
        style: {
          border: "0.5px solid #1D1D1B",
          padding: "16px",
          color: "#1D1D1B",
          borderRadius: "6px",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#FFFAEE",
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteExistingImage = async (image: string, id: string) => {
    setIsDeleting(true);
    const token = cookies.get("admin_token");

    if (token) {
      setAuthToken(token);
    }

    const deleteImageData = {
      public_urls: [image],
    };

    const deletePromise = deleteGalleryImage(id, deleteImageData).then(() => {
      onClose();
      fetchGalleries();
    });

    toast.promise(
      deletePromise,
      {
        loading: "Deleting image...",
        success: "Image deleted successfully",
        error: (err) => {
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            "Something went wrong";
          return message;
        },
      },
      {
        style: {
          border: "1px solid #1D1D1B",
          padding: "16px",
          color: "#1D1D1B",
          borderRadius: "6px",
        },
        success: {
          iconTheme: {
            primary: "#008000",
            secondary: "#FFFAEE",
          },
        },
        error: {
          iconTheme: {
            primary: "#FF0000",
            secondary: "#FFFAEE",
          },
        },
      }
    );

    deletePromise.finally(() => {
      setIsDeleting(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full md:p-7 p-4 !border-none rounded-none md:!max-w-[716px] max-w-[332.77px]">
        <DialogHeader>
          <DialogTitle className="!font-normal pb-5 border-b">
            <div className="flex flex-col text-left">
              <div className="text-sm sm:text-base text-[#1D1D1B] mb-2 font-semibold">
                LINK
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-sm text-[#1D1D1B]">{generatedLink}</p>

                <button
                  onClick={handleCopyLink}
                  className="w-[83px] h-[22px] flex items-center justify-center px-3 py-2 bg-[#E4E4E4] text-[#4C4C4C] text-sm rounded-full hover:bg-[#f4f4f4] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copySuccess ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>

          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            <div className="mt-5">
              <div className="text-sm sm:text-base text-[#787878] mb-2">
                Images <span className="text-[#CE2B2B]">*</span>
              </div>

              <div className="w-full overflow-hidden md:max-w-[655px] max-w-[300px]">
                <div className="w-full overflow-x-auto overflow-y-auto">
                  <div className="flex gap-4 pb-2 min-w-fit">
                    {/* Upload area */}
                    <div
                      className="flex-shrink-0 w-[134.16px] h-[142px] border-[0.5px] border-[#C9C9C9] bg-white flex flex-col items-center justify-center cursor-pointer relative"
                      onClick={triggerFileInput}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <p className="text-[12px] text-[#444444] text-center px-2">
                        Drag & Drop or
                        <br />
                        <span className="text-[#B8860B]">Click to Upload</span>
                      </p>
                      <p className="text-[10px] text-[#787878] mt-1 absolute bottom-3">
                        PNG & JPG supported
                      </p>
                    </div>

                    {/* Existing images from gallery */}
                    {order?.images?.map((image, index) => (
                      <div
                        key={`existing-${index}`}
                        className="flex-shrink-0 w-[134.16px] h-[142px] relative border border-gray-200"
                      >
                        <Image
                          src={image}
                          alt={`Gallery Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 py-[6px] px-2 gap-1 right-0 flex items-center space-x-1 bg-white left-0 justify-end">
                          <button
                            onClick={() =>
                              handleViewExistingImage(
                                image,
                                `Gallery Image ${index + 1}`
                              )
                            }
                            className="flex items-center justify-center cursor-pointer hover:opacity-70"
                            title="View"
                          >
                            <Eye size={16} className="ml-1" />
                          </button>
                          <div className="w-[0.5px] h-[15px] bg-[#CFCFCF]"></div>
                          <button
                            onClick={() =>
                              handleDeleteExistingImage(image, order?.id || "")
                            }
                            className="flex items-center justify-center cursor-pointer hover:opacity-70"
                            title="Delete"
                            disabled={isDeleting}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* New uploaded images */}
                    {uploadedImages
                      .slice()
                      .reverse()
                      .map((image) => (
                        <div
                          key={image.id}
                          className="flex-shrink-0 w-[134.16px] h-[142px] relative border border-gray-200"
                        >
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 py-[6px] px-2 gap-1 right-0 flex items-center space-x-1 bg-white left-0 justify-end">
                            <button
                              onClick={() => handleViewImage(image)}
                              className="flex items-center justify-center cursor-pointer hover:opacity-70"
                              title="View"
                            >
                              <Eye size={16} className="ml-1" />
                            </button>
                            <div className="w-[0.5px] h-[15px] bg-[#CFCFCF]"></div>
                            <button
                              onClick={() => handleDeleteImage(image.id)}
                              className="flex items-center justify-center cursor-pointer hover:opacity-70"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="w-[113px] h-[38px] uppercase rounded-full bg-[#1D1D1B] text-white border-none outline-none text-sm font-semibold cursor-pointer disabled:opacity-50"
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                onClick={onClose}
                className="w-[82px] h-[38px] uppercase rounded-full bg-white border border-[#1D1D1B] text-[#1D1D1B] text-sm font-semibold cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        selectedImage={selectedImage}
        handleCloseImageModal={handleCloseImageModal}
      />
    </Dialog>
  );
};

export default ClientGalleryTableModal;
