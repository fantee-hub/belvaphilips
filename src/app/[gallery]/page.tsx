"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Eye, Download, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getGalleryBySlug } from "@/lib/api";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Gallery {
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  id: string;
  images: string[];
}

export default function GalleryPage() {
  const params = useParams();
  const galleryName = params?.gallery as string;

  const [galleryData, setGalleryData] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const displayName = galleryName
    ? galleryName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("'s ")
    : "Gallery";

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await getGalleryBySlug(galleryName);
        if (data) {
          setGalleryData(data.data);
          console.log(data.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (galleryName) {
      fetchGalleryData();
    }
  }, [galleryName]);

  const handleDownload = async (image: any) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        image.title || `${galleryName}-image-${new Date().toISOString()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleViewImage = (image: any) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <header className="w-full bg-white fixed left-0 right-0 z-[20] py-6 border-b border-[#E0E0E0] max-w-[1800px] mx-auto">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-[3.68px]">
            <Image
              src={"/assets/images/belvaphilips.svg"}
              width={40.18}
              height={30.74}
              alt="belvaphilips imagery"
            />
            <span
              className={`font-logo text-[23.29px] flex items-center gap-[2.45px]`}
            >
              <span className={`font-black`}>BELVAPHILIPS</span>
              <span className="font-light ">IMAGERY</span>
            </span>
          </div>
        </div>
      </header>

      <div className="pt-[130px] container mx-auto px-4">
        <div>
          <h1 className="text-[22px] font-semibold text-[#1D1D1B]">
            {displayName}
          </h1>
          <p className="text-[#585858] mt-8 text-sm">All Uploads</p>
        </div>

        <div className="bg-white rounded-lg mt-3">
          <div className="h-96 sm:h-[500px] lg:h-[600px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {galleryData?.images.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square bg-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-200"
                >
                  <Image
                    src={image}
                    alt={galleryData.title}
                    fill
                    className="object-cover "
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  />

                  {/* Overlay with Icons */}
                  <div className="absolute bottom-0 py-[2px] px-2 gap-1 right-0 flex items-center space-x-1 bg-white left-0 justify-end">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewImage(image)}
                        className="h-8 w-8 flex items-center justify-center rounded-sm p-0 bg-white hover:bg-gray-100 cursor-pointer"
                      >
                        <Eye size={18} className=" text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDownload(image)}
                        className="h-8 w-8 flex items-center justify-center rounded-sm p-0 bg-white hover:bg-gray-100 cursor-pointer"
                      >
                        <Download size={18} className="text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {galleryData?.images.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  No images found in this gallery.
                </p>
              </div>
            )}
          </div>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogContent className="max-w-4xl max-h-[90vh] !p-0 overflow-hidden rounded-none !border-none">
            {selectedImage && (
              <div className="relative">
                <div className="relative aspect-auto max-h-[80vh]">
                  <Image
                    src={selectedImage}
                    alt={selectedImage.title || "Gallery Image"}
                    width={800}
                    height={600}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
                <div className="p-4 bg-white border-t">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedImage.title}
                    </h3>
                    <button
                      onClick={() => handleDownload(selectedImage)}
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
