"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState, useRef } from "react";
import CancelModal from "./CancelModal";
import { Eye, Trash2 } from "lucide-react";
import ImagePreviewModal from "./ImagePreviewModal";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import { createGallery } from "@/lib/api";

interface ClientGalleriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
}

export default function ClientGalleriesModal({
  open,
  onOpenChange,
}: ClientGalleriesModalProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [galleryName, setGalleryName] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(
    null
  );
  const [showImageModal, setShowImageModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cookies = new Cookies();

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };

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

  const handleDeleteImage = (imageId: string) => {
    setUploadedImages((prev) => {
      const imageToDelete = prev.find((img) => img.id === imageId);
      if (imageToDelete) {
        URL.revokeObjectURL(imageToDelete.url);
      }
      return prev.filter((img) => img.id !== imageId);
    });
  };

  const handleViewImage = (image: UploadedImage) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const handleGenerateLink = async () => {
    if (!galleryName.trim()) {
      alert("Please enter a gallery name");
      return;
    }

    setIsGeneratingLink(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const slugifiedName = galleryName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const link = `belvaphilips.com/${slugifiedName}`;
    setGeneratedLink(link);
    setIsGeneratingLink(false);
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

  const handleDeleteChanges = () => {
    setShowConfirmModal(false);
    onOpenChange(false);
    setGalleryName("");
    setUploadedImages([]);
    setGeneratedLink("");
    setCopySuccess(false);
    setIsGeneratingLink(false);
    setShowImageModal(false);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleStay = () => {
    setShowConfirmModal(false);
  };

  const handleSaveAndExit = async () => {
    if (!galleryName.trim() || uploadedImages.length === 0) {
      toast.error(
        "Please provide a gallery name and upload at least one image.",
        {
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
        }
      );
      return;
    }

    setIsSaving(true);

    const token = cookies.get("admin_token");

    if (token) {
      setAuthToken(token);
    }

    try {
      const uploadedUrls = await Promise.all(
        uploadedImages.map((img) => uploadToCloudinary(img.file))
      );

      const galleryData = {
        title: galleryName,
        slug: galleryName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        images: uploadedUrls,
      };

      const { data } = await createGallery(galleryData);

      if (data) {
        toast.success("Gallery created successfully", {
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
        onOpenChange(false);
        setIsSaving(false);

        setGalleryName("");
        setUploadedImages([]);
        setGeneratedLink("");
        setCopySuccess(false);
        setIsGeneratingLink(false);
        setShowImageModal(false);
        setSelectedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
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
      setIsSaving(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl w-full md:p-7 p-4 !border-none rounded-none md:!max-w-[716px] max-w-[332.77px]">
          <DialogTitle className="hidden"></DialogTitle>
          <div className="border-[#D1D1D1] border-b pb-[20px]">
            <h2 className="text-base font-semibold uppercase text-[#1D1D1B]">
              CREATE A NEW GALLERY
            </h2>
            <p className="text-sm text-[#787878] md:max-w-full max-w-[227px] pt-2 md:pt-0">
              Upload product images and generate a custom link for a user
            </p>
          </div>

          <div>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="galleryTitle"
                  className="block text-sm text-[#585858]"
                >
                  Gallery Title <span className="text-[#CE2B2B]">*</span>
                </label>
                <input
                  type="text"
                  id="galleryTitle"
                  value={galleryName}
                  onChange={(e) => setGalleryName(e.target.value)}
                  className="w-full mt-3 h-[39px] block w-full border-none outline-none p-4 rounded-full sm:text-sm bg-[#F4F4F4]"
                />
              </div>

              <div>
                <label
                  htmlFor="galleryImages"
                  className="block text-sm text-[#585858]"
                >
                  Upload Images <span className="text-[#CE2B2B]">*</span>
                </label>

                {uploadedImages.length === 0 ? (
                  <div
                    className="w-full mt-3 h-[115px] w-full border border-dashed border-[#C9C9C9] rounded-[8px] bg-[#F4F4F4] flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                  >
                    <div className="text-2xl text-gray-500 mb-1">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.0013 4.875V15.7083M13.0013 4.875C12.2428 4.875 10.8255 7.03549 10.293 7.58333M13.0013 4.875C13.7599 4.875 15.1772 7.03549 15.7096 7.58333"
                          stroke="#595959"
                          strokeWidth="1.625"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.6654 17.875C21.6654 20.5638 21.1042 21.125 18.4154 21.125H7.58203C4.8932 21.125 4.33203 20.5638 4.33203 17.875"
                          stroke="#595959"
                          strokeWidth="1.625"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-[#444444] mt-1">
                      <span className="font-xs">
                        Click here to upload images
                      </span>
                    </p>
                    <p className="text-[10px] text-[#787878] mt-1">
                      PNG & JPG supported
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 w-full overflow-hidden md:max-w-[655px] max-w-[300px]">
                    <div className="w-full overflow-x-auto overflow-y-auto ">
                      <div className="flex gap-4 pb-2 min-w-fit ">
                        <div
                          className="flex-shrink-0 w-[134.16px] h-[142px] border-[0.5px] border-[#C9C9C9]  bg-white flex flex-col items-center justify-center cursor-pointer relative"
                          onClick={triggerFileInput}
                        >
                          <p className="text-[12px] text-[#444444] text-center px-2">
                            Drag & Drop or
                            <br />
                            <span className="text-[#B8860B]">
                              Click to Upload
                            </span>
                          </p>
                          <p className="text-[10px] text-[#787878] mt-1 absolute bottom-3">
                            PNG & JPG supported
                          </p>
                        </div>

                        {/* Uploaded images */}
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
                                className="w-full h-full object-cover "
                              />

                              <div className="absolute bottom-0 py-[6px] px-2 gap-1 right-0 flex items-center space-x-1 bg-white left-0 justify-end">
                                <button
                                  onClick={() => handleViewImage(image)}
                                  className=" flex items-center justify-center cursor-pointer hover:opactiy-2"
                                  title="View"
                                >
                                  <Eye size={16} className="ml-1" />
                                </button>
                                <div className="w-[0.5px] h-[15px] bg-[#CFCFCF]"></div>
                                <button
                                  onClick={() => handleDeleteImage(image.id)}
                                  className=" flex items-center justify-center cursor-pointer hover:opactiy-2 "
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
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  id="galleryImages"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="flex md:items-center md:justify-between md:gap-2 md:flex-row flex-col gap-3 border-b pb-6 md:border-none md:pb-0">
                <div className="flex items-center relative md:flex-5 md:flex-row flex-col">
                  <input
                    type="text"
                    placeholder={generatedLink || "Generate a link"}
                    value={generatedLink}
                    readOnly
                    className="w-full px-5 h-[39px] bg-[#F4F4F4] outline-none rounded-full rounded-[14px] placeholder:text-[#585858]"
                  />
                  {generatedLink && (
                    <button
                      onClick={handleCopyLink}
                      className={`w-[83px] h-[22px] md:flex hidden items-center cursor-pointer justify-center text-sm font-medium rounded-full absolute right-2 transition-colors 
                      
                          bg-[#E4E4E4] text-[#4C4C4C] hover:bg-[#dcdcdc]
                      `}
                    >
                      {copySuccess ? "Copied!" : "Copy Link"}
                    </button>
                  )}
                </div>
                <div className="md:flex-1 flex items-center gap-[10px] md:gap-0">
                  <button
                    onClick={handleGenerateLink}
                    disabled={isGeneratingLink || !galleryName.trim()}
                    className="md:w-full w-[113px] md:h-[39px] h-[29px] flex items-center cursor-pointer justify-center text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingLink ? "Generating..." : "Generate link"}
                  </button>
                  {generatedLink && (
                    <button
                      onClick={handleCopyLink}
                      className={`w-[77px] h-[29px] flex md:hidden items-center cursor-pointer justify-center text-xs font-medium rounded-full  transition-colors 
                      
                          bg-[#E4E4E4] text-[#4C4C4C] hover:bg-[#dcdcdc]
                      `}
                    >
                      {copySuccess ? "Copied!" : "Copy Link"}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <button
                    onClick={handleSaveAndExit}
                    disabled={isSaving}
                    className="w-[113px] h-[38px] uppercase rounded-full bg-[#1D1D1B] text-white border-none outline-none text-sm font-semibold cursor-pointer"
                  >
                    {isSaving ? "Saving..." : "Save & Exit"}
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleCancelClick}
                    className="w-[82px] h-[38px] uppercase rounded-full bg-white border border-[#1D1D1B] text-[#1D1D1B] text-sm font-semibold cursor-pointer"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>

        <CancelModal
          onOpenChange={onOpenChange}
          showConfirmModal={showConfirmModal}
          setShowConfirmModal={setShowConfirmModal}
          handleDeleteChanges={handleDeleteChanges}
          handleStay={handleStay}
        />
      </Dialog>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        selectedImage={selectedImage}
        handleCloseImageModal={handleCloseImageModal}
      />
    </>
  );
}
