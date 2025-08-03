import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

interface ClientGalleriesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ClientGalleriesModal({
  open,
  onOpenChange,
}: ClientGalleriesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full p-6 !border-none rounded-none md:!max-w-[716px] max-w-[332.77px]">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="border-[#D1D1D1] border-b pb-[20px]">
          <h2 className="text-base font-semibold uppercase text-[#1D1D1B]">
            CREATE A NEW GALLERY
          </h2>
          <p className="text-sm text-[#787878]">
            Upload product images and generate a custom link for a user
          </p>
        </div>

        <div>
          <div className=" space-y-5">
            <div>
              <label
                htmlFor="galleryName"
                className="block text-sm text-[#585858]"
              >
                Gallery Name <span className="text-[#CE2B2B]">*</span>
              </label>
              <input
                type="text"
                id="galleryName"
                className="w-full mt-3 h-[39px] block w-full border-none outline-none p-4 rounded-full  sm:text-sm bg-[#F4F4F4]"
              />
            </div>

            <div>
              <label
                htmlFor="galleryImages"
                className="block text-sm text-[#585858]"
              >
                Upload Images <span className="text-[#CE2B2B]">*</span>
              </label>
              <div className="md:w-full mt-3 md:h-[115px] w-full  border border-dashed border-[#C9C9C9] rounded-[8px] bg-[#F4F4F4] flex flex-col items-center justify-center relative overflow-hidden">
                <>
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
                    <span className="font-xs">Click here to upload images</span>
                  </p>
                  <p className="text-[10px] text-[#787878] mt-1">
                    PNG & JPG supported
                  </p>
                </>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="galleryImages"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
              </div>
            </div>
            <div className="flex items-center justify-between  gap-2">
              <div className="flex items-center relative flex-5">
                <input
                  type="text"
                  placeholder="Generate a link"
                  readOnly
                  className="w-full px-5 sm:h-[39px] h-[78px] bg-[#F4F4F4] outline-none sm:rounded-full rounded-[14px] placeholder:text-[#585858]"
                />
                <button className="w-[83px] h-[22px] flex items-center cursor-pointer justify-center text-sm  font-medium bg-[#E4E4E4] text-[#4C4C4C] rounded-full hover:bg-[#dcdcdc] absolute right-2">
                  Copy Link
                </button>
              </div>
              <div className="flex-1">
                <button className="w-full h-[39px] flex items-center cursor-pointer justify-center text-sm  font-medium bg-black text-white rounded-full hover:bg-gray-800">
                  Generate link
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <button className="w-[113px] h-[38px] uppercase rounded-full bg-[#1D1D1B] text-white border-none outline-none text-sm font-semibold cursor-pointer">
                  SAVE & EXIT
                </button>
              </div>
              <div>
                <button className="w-[82px] h-[38px] uppercase rounded-full bg-white border border-[#1D1D1B] text-[#1D1D1B] text-sm font-semibold cursor-pointer">
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
