import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface AccordionProps {
  title: string;
  content: string | React.ReactNode;
}

const FramedContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {/* Container with thin border */}
    <div className="relative">{children}</div>

    {/* Corner lines - top left */}
    <div className="absolute top-0 left-0 w-4 h-px bg-black"></div>
    <div className="absolute top-0 left-0 w-px h-4 bg-black"></div>

    {/* Corner lines - top right */}
    <div className="absolute top-0 right-0 w-4 h-px bg-black"></div>
    <div className="absolute top-0 right-0 w-px h-4 bg-black"></div>

    {/* Corner lines - bottom left */}
    <div className="absolute bottom-0 left-0 w-4 h-px bg-black"></div>
    <div className="absolute bottom-0 left-0 w-px h-4 bg-black"></div>

    {/* Corner lines - bottom right */}
    <div className="absolute bottom-0 right-0 w-4 h-px bg-black"></div>
    <div className="absolute bottom-0 right-0 w-px h-4 bg-black"></div>
  </div>
);

const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FramedContainer>
      <div className="bg-[#F9F9F9] ">
        <button
          className="flex justify-between items-center w-full py-4 px-5 text-left cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-[20px] leading-[115%]">
            {title}
          </span>
          <motion.div>
            <span className="">
              {isOpen ? (
                <Minus className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </span>
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-5 pb-4 text-[#1D1D1B] max-w-[447px] leading-[115%]">
                {typeof content === "string" ? <p>{content}</p> : content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FramedContainer>
  );
};

export default Accordion;
